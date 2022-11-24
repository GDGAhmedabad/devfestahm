import { customElement } from '@polymer/decorators';
import '@polymer/iron-icon';
import '@polymer/paper-icon-button';
import '@polymer/paper-progress';
import { html, PolymerElement } from '@polymer/polymer';
import '@power-elements/lazy-image';
import '../components/hero/simple-hero';
import '../components/text-truncate';
import '../elements/content-loader';
import '../elements/filter-menu';
import '../elements/shared-styles';
import { ReduxMixin } from '../store/mixin';
import { contentLoaders, heroSettings, jobs } from '../utils/data';
import '../utils/icons';

@customElement('job-listing-page')
export class JobListingPage extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
        }


        .description-wrapper {
          background-color: var(--secondary-background-color);
          width: 100%;
          overflow: hidden;
        }

        .team-title {
          font-size: 30px;
          line-height: 2.5;
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

        .photo {
          flex: none;
          --lazy-image-width: 96px;
          --lazy-image-height: 96px;
          --lazy-image-fit: cover;
          width: var(--lazy-image-width);
          height: var(--lazy-image-height);
          background-color: var(--contrast-additional-background-color);
          border-radius: 50%;
          overflow: hidden;
          transform: translateZ(0);
          border-radius: 50%;
          border: 5px solid var(--contrast-additional-background-color);
        }

        .member-details {
          color: var(--primary-text-color);
          margin-left: 16px;
        }

        .company-name {
          line-height: 1.2;
        }

        .activity {
          font-size: 16px;
          padding-left: 6px;
        }

        .social-icon {
          --paper-icon-button: {
            padding: 6px;
            width: 32px;
            height: 32px;
          }

          color: var(--secondary-text-color);
          transition: transform var(--animation);
        }

        .social-icon:hover {
          transform: scale(1.1);
        }

        @media (min-width: 640px) {
          .team-block {
            grid-template-columns: repeat(2, 1fr);
          }

          .container {
            grid-template-columns: repeat(2, 1fr);
          }

          .member {
            padding: 32px 0;
          }
        }

        @media (min-width: 812px) {
          .photo {
            --lazy-image-width: 115px;
            --lazy-image-height: 115px;
          }

          .team-block {
            grid-template-columns: repeat(3, 1fr);
          }

          .container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .team-block {
            grid-template-columns: repeat(4, 1fr);
          }

          .photo {
            --lazy-image-width: 128px;
            --lazy-image-height: 128px;
          }

          .container {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .job-company-card {
          background: #f9f9f9;
          box-shadow: 5px 5px 8px #b5b5b5;
        }

        .company-openings {
          margin-top: 10px;
        }


      </style>

      <hero-block
      background-image="[[heroSettings.background.image]]"

        background-color="[[heroSettings.background.color]]"
        font-color="[[heroSettings.fontColor]]"
      >
        <div class="hero-title">[[heroSettings.title]]</div>
        <p class="hero-description">[[heroSettings.description]]</p>
      </hero-block>


      <template is="dom-if" if="{{!showItemDetails}}">
        <div class="container">
          <div class="team-block" >
            <template is="dom-repeat" items="[[jobs]]" as="job" index-as="index" >
              <div on-click="showDescription">
                <div class="member job-company-card" layout horizontal>
                  <div class="member-details" layout vertical center-justified start>
                    <h2 class="company-name">[[job.companyName]]</h2>
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
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>

      <template is="dom-if" if="{{showItemDetails}}">
        <div class="container">
          <div on-click="backToListing">
            Back
          </div>
          <div class="member" layout horizontal>
            <div class="member-details" layout vertical center-justified start>
              <h2 class="company-name">[[selectedJob.companyName]]</h2>
              <div class="company-details">
                <p>Website: <a href$="[[selectedJob.companyWebsite]]">[[selectedJob.companyWebsite]]</a></p>
                <p>Career: <a href$="[[selectedJob.companyCareerPage]]">[[selectedJob.companyCareerPage]]</a></p>
              </div>
              <p>Openings</p>
              <div class="team-block">
                <template is="dom-repeat" items="[[selectedJob.openings]]" as="opening">
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
  private contentLoaders = contentLoaders;
  private jobs = jobs;
  private selectedJob: any = null;

  private showItemDetails = false;

  showDescription(e: any) {
    this.selectedJob = e.model.__data.job;
    this.showItemDetails = true;
  }

  backToListing() {
    this.showItemDetails = false;
  }
}
