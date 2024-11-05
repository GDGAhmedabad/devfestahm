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
import { heroSettings, talents } from '../utils/data';
import { updateImageMetadata } from '../utils/metadata';
@customElement('meet-the-talent-detail')
export class MeetTheTalentDetail extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          height: 100%;
        }
        .talent-detail-container {
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
        .skill-block {
          display: flex;
          grid-gap: 10px;
        }
        .talent-details {
          color: var(--primary-text-color);
          margin-left: 16px;
        }
        .skill-title {
          margin-top: 30px;
        }

        .skill {
          background-color: var(--default-primary-color);
          color: white;
          padding: 2px 8px;
          border-radius: 50vh;
          font-size: 0.8em;
        }
      </style>

      <hero-block
        background-color="[[heroSettings.background.color]]"
        font-color="[[heroSettings.fontColor]]"
      >
        <div class="dialog-container header-content" layout horizontal center>
          <lazy-image
            class="photo"
            src="[[talentDetails.imageUrl]]"
            alt="[[talentDetails.fullName]]">
          </lazy-image>
          <div>
            <h2 class="name" flex>
              [[talentDetails.fullName]]
            </h2>
            <div class="subtitle">[[talentDetails.location]]</div>
            <div class="contacts" layout horizontal center-justified>
              <template is="dom-repeat" items="[[talentDetails.links]]" as="social">
                <a class="action" href$="[[social.link]]" target="_blank" rel="noopener noreferrer">
                  <paper-icon-button
                    class="social-icon"
                    icon="hoverboard:{{social.icon}}"
                  ></paper-icon-button>
                </a>
              </template>
            </div>
          </div>
        </div>
      </hero-block>

      <div class="talent-detail-container">
        <div class="" layout horizontal>
          <div class="talent-details" layout vertical center-justified start>
            <p>[[talentDetails.bio]]</p>
            <div></div>
            <div class="skill-block">
              <template is="dom-repeat" items="[[talentDetails.skills]]" as="skill">
                <div class="skill">
                  <span>[[skill]]</span><br>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <footer-block></footer-block>
    `;
  }

  private heroSettings = heroSettings.meetTheTalent;
  private talents = talents;
  private talentDetails: any;
  @property({ type: Object })
  private talent: { id?: string } = {};
  onAfterEnter(location: RouterLocation) {
    this.talent = location.params;
  }

  @observe('talent.id')
  onTalentId(talentId: string) {
    if (talentId) {
      this.talentDetails = talents.find((talent) => talent.id.toString() === talentId);
      if (!this.talentDetails) {
        router.render('/404');
      } else {
        updateImageMetadata(this.talentDetails.fullName, this.talentDetails.bio, {
          image: this.talentDetails.imageUrl,
          imageAlt: this.talentDetails.fullName,
        });
      }
    }
  }
}
