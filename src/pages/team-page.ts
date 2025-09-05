import { customElement } from '@polymer/decorators';
import '@polymer/paper-icon-button';
import { html, PolymerElement } from '@polymer/polymer';
import '@power-elements/lazy-image';
import { team as teams } from '../../public/data/firestore-data.json';
import '../components/hero/simple-hero';
import '../components/markdown/short-markdown';
import '../elements/shared-styles';
import { ReduxMixin } from '../store/mixin';
import { heroSettings, loading, team } from '../utils/data';
import { updateMetadata } from '../utils/metadata';

@customElement('team-page')
export class TeamPage extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
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

        .name {
          padding-left: 6px;
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

          .member {
            padding: 32px 0;
          }
        }

        @media (min-width: 812px) {
          .photo {
            --lazy-image-width: 115px;
            --lazy-image-height: 115px;
          }
        }

        @media (min-width: 1024px) {
          .team-block {
            grid-template-columns: repeat(3, 1fr);
          }

          .photo {
            --lazy-image-width: 128px;
            --lazy-image-height: 128px;
          }
        }
      </style>

      <hero-block
        background-image="[[heroSettings.background.image]]"
        background-color="[[heroSettings.background.color]]"
        font-color="[[heroSettings.fontColor]]"
      >
        <br><br>
        <div class="hero-title">[[heroSettings.title]]</div>
        <p class="hero-description">[[heroSettings.description]]</p>
        <br><br>
      </hero-block>

      <div class="description-wrapper">
        <div class="container" layout horizontal justified>
          <short-markdown content="[[team.description]]"></short-markdown>
        </div>
      </div>

      <div class="container">

        <template is="dom-repeat" items="[[teams]]" as="team">
          <div class="team-title">[[team.title]]</div>

          <div class="team-block">
            <template is="dom-repeat" items="[[team.members]]" as="member">
              <div class="member" layout horizontal>
                <lazy-image
                  class="photo"
                  src="[[member.photoUrl]]"
                  alt="[[member.name]]"
                ></lazy-image>

                <div class="member-details" layout vertical center-justified start>
                  <h2 class="name">[[member.name]]</h2>
                  <div class="activity">[[member.title]]</div>
                  <div class="contacts">
                    <template is="dom-repeat" items="[[member.socials]]" as="social">
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
            </template>
          </div>
        </template>
      </div>

      <footer-block></footer-block>
    `;
  }

  private heroSettings = heroSettings.team;
  private loading = loading;
  private team = team;
  private teams = teams;

  override connectedCallback() {
    super.connectedCallback();
    updateMetadata(this.heroSettings.title, this.heroSettings.metaDescription);
  }

}
