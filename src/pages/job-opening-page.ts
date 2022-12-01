import { customElement, observe, property } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import '@power-elements/lazy-image';
import { RouterLocation } from '@vaadin/router';
import '../components/hero/simple-hero';
import '../components/text-truncate';
import '../elements/content-loader';
import '../elements/shared-styles';
import { router } from '../router';
import { ReduxMixin } from '../store/mixin';
import { heroSettings, jobs } from '../utils/data';
import { updateImageMetadata } from '../utils/metadata';

@customElement('job-opening-page')
export class JobOpeningPage extends ReduxMixin(PolymerElement) {

  static get template() {
    return html`
        <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          height: 100%;
        }
        .job-openings-container {
          margin: 0 auto;
          padding: 10px 16px;
          max-width: var(--max-container-width);
        }
        .photo {
          margin-right: 16px;
          --lazy-image-width: 128px;
          --lazy-image-height: 128px;
          --lazy-image-fit: cover;
          width: var(--lazy-image-width);
          height: var(--lazy-image-height);
          overflow: hidden;
          border-radius: 50%;
          background-color: var(--contrast-additional-background-color);
          transform: translateZ(0);
          flex-shrink: 0;
        }
        .name {
          margin-top: 8px;
          line-height: 1;
        }
        .team-block {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 24px;
          margin-bottom: 32px;
        }
        .member-details {
          color: var(--primary-text-color);
          margin-left: 16px;
        }
        .opening-title {
          margin-top: 30px;
        }
        @media (min-width: 640px) {
          .team-block {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 812px) {
          .team-block {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .team-block {
            grid-template-columns: repeat(4, 1fr);
          }

          .hiring-image {
            width: auto;
          }
        }

        .hiring-image {
          --lazy-image-width: 100%;
          --lazy-image-height: auto;
          --lazy-image-fit: cover;
          max-width: var(--lazy-image-width);
          height: var(--lazy-image-height);
          overflow: hidden;
          flex-shrink: 0;
        }
      </style>

      <hero-block
        background-color="[[heroSettings.background.color]]"
        font-color="[[heroSettings.fontColor]]"
      >
        <div class="dialog-container header-content" layout horizontal center>
          <lazy-image class="photo" src="[[companyDetails.companyLogoUrl]]" alt="[[companyDetails.companyName]]"></lazy-image>
          <div>
            <h2 class="name" flex>
              [[companyDetails.companyName]]
              <a href$="[[companyDetails.companyWebsite]]" target="_blank" rel="noopener noreferrer">
                <paper-icon-button
                  icon="hoverboard:website"
                ></paper-icon-button>
              </a>
              <a href$="[[companyDetails.linkedin]]" target="_blank" rel="noopener noreferrer">
                <paper-icon-button
                  icon="hoverboard:linkedin"
                ></paper-icon-button>
              </a>
            </h2>
            <div class="subtitle">[[companyDetails.location]]</div>
          </div>
        </div>
      </hero-block>

      <div class="job-openings-container">
        <div class="" layout horizontal>
          <div class="member-details" layout vertical center-justified start>
            <p>[[companyDetails.bio]]</p>
            <a href="[[companyDetails.companyCareerPage]]" target="_blank" rel="noopener noreferrer">
              <paper-button primary class="cta-button animated icon-right">
                <span>Apply now</span>
                <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
              </paper-button>
            </a>
            <h2 class="opening-title">Openings</small></h2>
            <br>
            <div class="team-block">
              <template is="dom-repeat" items="[[companyDetails.openings]]" as="opening">
                <div class="company-openings">
                  <span>[[opening.title]] ([[opening.count]])</span><br>
                  <small>Experience: [[opening.experience]]</small>
                </div>
              </template>
            </div>
            <template is="dom-if" if="[[companyDetails.hiringImage]]">
              <img class="hiring-image" src="[[companyDetails.hiringImage]]" alt="hiring image"></img>
            </template>
          </div>
        </div>
      </div>

      <footer-block></footer-block>
    `;
  }

  private heroSettings = heroSettings.jobOpenings;
  private jobs = jobs;
  private companyDetails: any;
  @property({ type: Object })
  private compnay: { id?: string } = {};
  onAfterEnter(location: RouterLocation) {
    this.compnay = location.params;
  }

  @observe('compnay.id')
  onCompanyId(companyId: string) {
    if (companyId) {
      this.companyDetails = jobs.find((job) => job.id.toString() === companyId);
      if (!this.companyDetails) {
        router.render('/404');
      } else {
        updateImageMetadata(this.companyDetails.companyName, this.companyDetails.bio, {
          image: this.companyDetails.companyLogoUrl,
          imageAlt: this.companyDetails.companyName,
        });
      }
    }
  }
}
