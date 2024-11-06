import { customElement } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import '@power-elements/lazy-image';
import '../components/hero/simple-hero';
import '../components/text-truncate';
import '../elements/content-loader';
import '../elements/shared-styles';
import { router } from '../router';
import { ReduxMixin } from '../store/mixin';
import { heroSettings, meetTheTalent, talents } from '../utils/data';

@customElement('meet-the-talent-page')
export class MeetTheTalentPage extends ReduxMixin(PolymerElement) {

  static get template() {
    return html`
        <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          height: 100%;
        }
        .meet-the-talent-container {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 16px;
          min-height: 35%;
          margin: 0 auto;
          padding: 24px 16px;
          max-width: var(--max-container-width);
        }
        .talent {
          padding: 32px 24px;
          background: var(--primary-background-color);
          text-align: center;
          transition: box-shadow var(--animation);
        }
        .talent:hover {
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
        @media (min-width: 640px) {
          .meet-the-talent-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 812px) {
          .meet-the-talent-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .meet-the-talent-container {
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

        .action {
          margin-right: 16px;
          color: var(--secondary-text-color);
          cursor: pointer;
          user-select: none;
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
          <strong>Add your profile</strong><br>
          Follow steps mentioned over the Github repository
          <a
            href="https://github.com/GDGAhmedabad/devfestahm?tab=readme-ov-file#list-your-profile-for-meet-the-talent"
            target="_blank">
            https://github.com/GDGAhmedabad/devfestahm?tab=readme-ov-file#list-your-profile-for-meet-the-talent
          </a>
        </p>
        <p> <strong>Disclaimer:</strong> [[meetTheTalent.disclaimer]] </p>
      </div>
      <div class="meet-the-talent-container">
        <template is="dom-repeat" items="[[talents]]" as="talent" index-as="index">
          <a class="talent card" href$="[[talentUrl(index)]]">
            <template is="dom-if" if="[[talent.imageUrl]]">
              <lazy-image
                class="photo"
                src="[[talent.imageUrl]]"
                alt="[[talent.fullName]]"
              ></lazy-image>
            </template>
            <div class="description">
              <h2 class="name">[[talent.fullName]]</h2>
              <div class="origin">[[talent.location]]</div>
              <text-truncate lines="4">
                <div class="bio">[[talent.bio]]</div>
              </text-truncate>
            </div>
            <div class="contacts" layout horizontal center-justified>
              <template is="dom-repeat" items="[[talent.links]]" as="social">
                <template is="dom-if" if="[[social.link]]">
                  <a class="action" href$="[[social.link]]" target="_blank" rel="noopener noreferrer">
                    <paper-icon-button
                      class="social-icon"
                      icon="hoverboard:{{social.icon}}"
                    ></paper-icon-button>
                  </a>
                </template>
              </template>
            </div>
          </a>
        </template>
      </div>

      <footer-block></footer-block>
    `;
  }

  private heroSettings = heroSettings.meetTheTalent;
  private talents = talents;
  private meetTheTalent = meetTheTalent;


  private talentUrl(index: string) {
    return router.urlForName('meet-the-talent-detail', { id: index });
  }
}
