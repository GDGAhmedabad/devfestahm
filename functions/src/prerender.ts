/* eslint-disable */

import express from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import url from 'url';

const app = express();

const getSiteDomain = async () => {
  const doc = await getFirestore().collection('config').doc('site').get();
  return doc.data().domain;
};

const getRendertronServer = async () => {
  const doc = await getFirestore().collection('config').doc('rendertron').get();
  return doc.data().server;
};

/**
 * generateUrl() - Piece together request parts to form FQDN URL
 * @param {Object} request
 */
const generateUrl = async (request) => {
  // Why do we use config site.domain instead of the domain from
  // the request? Because it'll give you the wrong domain (pointed at the
  // cloudfunctions.net)
  return url.format({
    protocol: request.protocol,
    host: await getSiteDomain(),
    pathname: request.originalUrl,
  });
};

/**
 * checkForBots() - regex that UserAgent, find me a linkbot
 * @param {String} userAgent
 */
const checkForBots = (userAgent) => {
  // These are link bots only!
  // DO NOT ADD GOOGLEBOT.
  // If you add Googlebot to this, you will not have a good day.
  // This is a mix of Sam Li's list (https://github.com/webcomponents/webcomponents.org/blob/696eb6d6f1fe955db395e96d97c3d1dfe0a02b26/client/bot-filter.py#L9)
  // and my list (https://github.com/justinribeiro/blog-pwa/blob/a7174657f3e910cacf2f089c012d40bec719293e/appengine/main.py#L28)
  const botList =
    'baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|slackbot|facebot|developers.google.com/+/web/snippet/'.toLowerCase();

  // FIND THE BOT AMONG THE USSSERRRS
  return userAgent.toLowerCase().search(botList) !== -1;
};

// This WILL NOT run for index.html because Exact-match static content is before
// configured rewrites (see "Hosting Priorities" https://firebase.google.com/docs/hosting/url-redirects-rewrites)
//
// The trick is on L66, pwaShell(): You must update that file! Open for explainer.
app.get('*', async (req, res) => {
  const botResult = checkForBots(req.headers['user-agent']);

  if (botResult) {
    // Bot path via Rendertron (you can keep your caching here if you want)
    const targetUrl = await generateUrl(req);
    const rendertron = await getRendertronServer();

    const botResp = await fetch(`${rendertron}/render/${targetUrl}`);
    const body = await botResp.text();

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.set('Vary', 'User-Agent');
    return res.send(body.toString());
  }

  // ✅ Non-bot path: fetch the current Hosting HTML so it’s never stale
  const site = await getSiteDomain();
  const htmlResp = await fetch(`https://${site}/index.html`, {
    // prevent node-fetch from reusing cached responses
    headers: { 'Cache-Control': 'no-cache' }
  });
  const html = await htmlResp.text();

  // No-cache for HTML so users revalidate on each load
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');

  return res.status(htmlResp.status || 200).send(html);
});

export const prerender = functions.https.onRequest(app);
