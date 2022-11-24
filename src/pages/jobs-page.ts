import { customElement } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import '@power-elements/lazy-image';
import '../components/hero/simple-hero';
import '../components/text-truncate';
import '../elements/content-loader';
import '../elements/shared-styles';
import { ReduxMixin } from '../store/mixin';
import { heroSettings, jobs } from '../utils/data';

@customElement('jobs-page')
export class JobsPage extends ReduxMixin(PolymerElement) {

  static get template() {
    return html`
        <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          height: 100%;
        }
        .job-container {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 16px;
          min-height: 50%;
          margin: 0 auto;
          padding: 24px 16px;
          max-width: var(--max-container-width);
        }
        .job-view-container {
          margin: 0 auto;
          padding: 10px 16px;
          max-width: var(--max-container-width);
        }
        .speaker {
          padding: 32px 24px;
          background: var(--primary-background-color);
          text-align: center;
          transition: box-shadow var(--animation);
        }
        .speaker:hover {
          box-shadow: var(--box-shadow);
        }
        .photo {
          display: inline-block;
          --lazy-image-width: 128px;
          --lazy-image-height: 128px;
          --lazy-image-fit: cover;
          width: var(--lazy-image-width);
          height: var(--lazy-image-height);
          background-color: var(--secondary-background-color);
          border-radius: 50%;
          overflow: hidden;
          transform: translateZ(0);
        }
        .description {
          color: var(--primary-text-color);
        }
        .name {
          margin-top: 8px;
          line-height: 1;
        }
        .origin {
          margin-top: 4px;
          font-size: 14px;
          line-height: 1.1;
        }
        .bio {
          margin-top: 16px;
          color: var(--secondary-text-color);
        }
        .contacts {
          margin-top: 16px;
        }
        .social-icon {
          --paper-icon-button: {
            padding: 6px;
            width: 32px;
            height: 32px;
          }
          color: var(--secondary-text-color);
        }
        .team-block {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 24px;
          margin-bottom: 32px;
        }
        .member {
          padding: 16px 0;
          min-width: 300px;
        }
        .member-details {
          color: var(--primary-text-color);
          margin-left: 16px;
        }
        .opening-title {
          margin: 20px 0;
        }
        @media (min-width: 640px) {
          .member {
            padding: 32px 0;
          }
          .job-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .team-block {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 812px) {
          .job-container {
            grid-template-columns: repeat(3, 1fr);
          }
          .team-block {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .job-container {
            grid-template-columns: repeat(4, 1fr);
          }
          .team-block {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      </style>

      <template is="dom-if" if="{{!showJobDetails}}">
        <hero-block
          background-color="[[heroSettings.background.color]]"
          font-color="[[heroSettings.fontColor]]"
        >
          <div class="hero-title">[[heroSettings.title]]</div>
          <p class="hero-description">[[heroSettings.description]]</p>
        </hero-block>
      </template>

      <template is="dom-if" if="{{showJobDetails}}">
        <hero-block
          background-color="[[heroSettings.background.color]]"
          font-color="[[heroSettings.fontColor]]"
        >
          <lazy-image class="photo" src="[[selectedCompnay.companyLogoUrl]]" alt="[[selectedCompnay.companyName]]"></lazy-image>
          <div class="hero-title">
            <a href$="[[selectedCompnay.companyWebsite]]">[[selectedCompnay.companyName]]</a>
            <paper-icon-button slide-icon"
              icon="hoverboard:website"
            ></paper-icon-button>
          </div>
          <p class="hero-description">[[selectedCompnay.bio]]</p>
          <a href="[[selectedCompnay.companyCareerPage]]">
            <paper-button primary class="cta-button animated icon-right">
              <span>Apply now</span>
              <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
            </paper-button>
          </a>
        </hero-block>
      </template>



      <template is="dom-if" if="{{!showJobDetails}}">
        <div class="job-container">
          <template is="dom-repeat" items="[[jobs]]" as="job">
            <a class="speaker card" on-click="showJobDetail">
              <lazy-image
                class="photo"
                src="[[job.companyLogoUrl]]"
                alt="[[job.companyName]]"
              ></lazy-image>
              <div class="description">
                <h2 class="name">[[job.companyName]]</h2>
                <div class="origin">[[job.location]]</div>
                <text-truncate lines="5">
                  <div class="bio">[[job.bio]]</div>
                </text-truncate>
              </div>
              <div class="contacts">
                <template is="dom-repeat" items="[[job.socials]]" as="social">
                  <a href$="[[social.link]]" target="_blank" rel="noopener noreferrer">
                    <paper-icon-button
                      class="social-icon"
                      icon="hoverboard:{{social.icon}}"
                    ></paper-icon-button>
                  </a>
                </template>
              </div>
            </a>
          </template>
        </div>
      </template>
      <template is="dom-if" if="{{showJobDetails}}">
      <div class="job-view-container">
        <a on-click="hideJobDetails">
          Back
        </a>
          <div class="" layout horizontal>
            <div class="member-details" layout vertical center-justified start>
              <h2 class="opening-title">Openings <small>(<a href$="[[selectedCompnay.companyCareerPage]]">more info</a>)</small></h2>
              <br>
              <div class="team-block">
                <template is="dom-repeat" items="[[selectedCompnay.openings]]" as="opening">
                  <div class="company-openings">
                    <span>[[opening.title]] ([[opening.count]])</span><br>
                    <small>Experience: [[opening.experience]]</small>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>

      <footer-block></footer-block>
    `;
  }

  private heroSettings = heroSettings.jobListing;
  private jobs = jobs;
  private selectedCompnay: any;
  private showJobDetails = false;


  showJobDetail(e: any) {
    this.selectedCompnay = e.model.__data.job;
    this.showJobDetails = true;
    this.heroSettings.title = this.selectedCompnay.companyName,
    this.heroSettings.description = this.selectedCompnay.bio
  }

  hideJobDetails() {
    this.showJobDetails = false;
    this.heroSettings = heroSettings.jobListing;
  }
}
