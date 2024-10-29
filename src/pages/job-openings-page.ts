import { customElement } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import '@power-elements/lazy-image';
import '../components/hero/simple-hero';
import '../components/text-truncate';
import '../elements/content-loader';
import '../elements/shared-styles';
import { router } from '../router';
import { ReduxMixin } from '../store/mixin';
import { heroSettings, jobOpenings, jobs } from '../utils/data';

@customElement('job-openings-page')
export class JobOpeningsPage extends ReduxMixin(PolymerElement) {

  static get template() {
    return html`
        <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          height: 100%;
        }
        .job-openings-container {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 16px;
          min-height: 35%;
          margin: 0 auto;
          padding: 24px 16px;
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
          .job-openings-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .team-block {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 812px) {
          .job-openings-container {
            grid-template-columns: repeat(3, 1fr);
          }
          .team-block {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .job-openings-container {
            grid-template-columns: repeat(4, 1fr);
          }
          .team-block {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .page-description {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          max-width: var(--max-container-width);
          padding: 24px 16px;
        }
      </style>

      <hero-block
        background-color="[[heroSettings.background.color]]"
        font-color="[[heroSettings.fontColor]]"
      >
        <div class="hero-title">[[heroSettings.title]]</div>
      </hero-block>
      <div class="page-description">
        <p> [[heroSettings.description]] </p>
        <p>
          <strong>Add your company's job opportunities</strong><br>
          Follow steps mentioned over the Github repository
          <a href="https://github.com/GDGAhmedabad/devfestahm#list-job-opportunities-of-the-companies" target="_blank">
            https://github.com/GDGAhmedabad/devfestahm#list-job-opportunities-of-the-companies
          </a>
        </p>
        <p> <strong>Disclaimer:</strong> [[jobOpenings.disclaimer]] </p>
      </div>
      <div class="job-openings-container">
        <template is="dom-repeat" items="[[jobs]]" as="job">
          <a class="speaker card" href$="[[jobUrl(job.id)]]">
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
          </a>
        </template>
      </div>

      <footer-block></footer-block>
    `;
  }

  private heroSettings = heroSettings.jobOpenings;
  private jobs = jobs;
  private jobOpenings = jobOpenings;


  private jobUrl(id: string) {
    return router.urlForName('job-opening-detail', { id });
  }
}
