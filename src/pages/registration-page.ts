import { customElement } from '@polymer/decorators';
import { PolymerElement, html } from '@polymer/polymer';
import '../components/hero/simple-hero';
import '../components/markdown/remote-markdown';
import '../elements/footer-block';
import { heroSettings, registerClosed, registerNow, socialNetwork } from '../utils/data';
import { updateMetadata } from '../utils/metadata';

@customElement('registration-page')
export class RegistrationPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          height: 100%
        }
        .registration-container {
          margin: 0 auto;
          padding: 10px 16px;
          max-width: var(--max-container-width);
        }
        .steps {
          display: flex;
          margin: 10px;
          justify-content: space-between;
          width: 100%;
        }
        .step {
          p {
            padding-left: 20px;
          }
        }

        .nav-inline {
          padding: 0;
        }
        .nav-inline li{
          display: inline-block;
        }

        .nav-inline a {
          color: var(--footer-text-color);
          text-decoration: none;
        }

        .social-group.share-block {
          margin-bottom: 17px;
        }

        .step-block {
          position: relative;
          width: calc(50% - 20px);
          margin: 0 10px;
          background-color: var(--default-primary-color);
          color: #fff;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          padding: 10px;
          border-radius: 10px;
        }

        .step-name {
          position: absolute;
          top: 16px;
          left: 32px;
          background-color: var(--accent-color);
          color: #fff;
          padding: 5px 10px;
          border-top-left-radius: 10px;
          border-bottom-right-radius: 5px;
          transform: translate(-50%, -50%);
        }

        .step-description {
          margin-top: 40px;
          font-size: 16px;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .steps {
            flex-direction: column;
            align-items: center;
            padding-right: 10px;
          }
          .step-block {
            width: 100%;
            margin: 10px 10px;
          }
        }
        iron-icon {
          --iron-icon-fill-color: currentColor;
          margin-right: 8px;
        }
        .register-btn {
          text-align: center;
          margin-top: 50px;
        }
        .register-btn-closed {
          background-color: red !important;
        }
      </style>

      <simple-hero page="registration"></simple-hero>

      <div class="registration-container">
        <div>
          <h1>Important Instructions:</h1>
          <ul>
            <li>
              Marking RSVP on our official <a href="https://gdg.community.dev/gdg-ahmedabad/" target="_blank">GDG Ahmedabad page</a> on the Google website is not a final ticket or a registration.
            </li>
            <li>
              Marking RSVP on our <a href="https://www.meetup.com/GDG-Ahmedabad/" target="_blank">meetup page</a> is not a final ticket or a registration.
            </li>
            <li>
              If you haven't joined the community and become a member yet, you should join now <a href="https://www.meetup.com/GDG-Ahmedabad/" target="_blank">https://www.meetup.com/GDG-Ahmedabad</a>
            </li>
            <li>
              Kindly follow us on our social media for all the upcoming updates and event announcements:
              <ul class="nav-inline">
                <template is="dom-repeat" items="[[socialNetwork.follow]]" as="socFollow">
                  <li>
                    <a href="[[socFollow.url]]" target="_blank" rel="noopener noreferrer">
                      <paper-icon-button icon="hoverboard:[[socFollow.name]]"></paper-icon-button>
                    </a>
                  </li>
                </template>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <h1>Super Important Instructions:</h1>
          <ul>
            <li>
              We don't have any direct or indirect way to get the tickets.
            </li>
            <li>
              We don't have On the spot registrations at the event. No Confirmed ticket means No entry for the event.
            </li>
            <li>
              Please let us stay focused on executing this event seamlessly. Don't reach out to any organizers or volunteers requesting a ticket. We know everyone in the community is super excited and wants to attend this event. Still, resources and venue capacity are limited, so we have to curate the entries received to give justice to the efforts of the organizing team and volunteers and, most importantly, to give quality participation to all the speakers and their content.
            </li>
          </ul>
        </div>
        <div>
          <h1>Registration process</h1>
          <div class="steps">
            <div class="step-block">
              <div class="step-name">Step 1</div>
              <div class="step-description">
                <p>We will announce a registration form</p>
              </div>
            </div>
            <div class="step-block">
              <div class="step-name">Step 2</div>
              <div class="step-description">
                <p>Fill out the registration form with complete details while keeping focus and attention to the details requested.</p>
              </div>
            </div>
            <div class="step-block">
              <div class="step-name">Step 3</div>
              <div class="step-description">
                <p>We will filter out the received registration entries</p>
              </div>
            </div>
            <div class="step-block">
              <div class="step-name">Step 4</div>
              <div class="step-description">
                <p><strong>If you are shortlisted, we will send you a confirmation email with a QR code to buy a ticket.</strong></p>
              </div>
            </div>
            <div class="step-block">
              <div class="step-name">Step 5</div>
              <div class="step-description">
                <p>Once you have paid the amount and bought the ticket, you are done with the registration ticket.</p>
              </div>
            </div>
            <div class="step-block">
              <div class="step-name">Step 6</div>
              <div class="step-description">
                <p>Bring the confirmed ticket and proof of government ID for verification.</p>
              </div>
            </div>
          </div>
          <div class="register-btn">
            <a href="https://forms.gle/77ipPmFTfeARoQNW8" target="_blank">
              <paper-button primary>
                <iron-icon icon="hoverboard:ticket"></iron-icon>
                [[registerNow]]
              </paper-button>
            </a>
          </div>
        </div>
      </div>

      <footer-block></footer-block>
    `;
  }

  private heroSettings = heroSettings.registration;
  private socialNetwork = socialNetwork;
  private registerNow = registerNow;
  private registerClosed = registerClosed;

  override connectedCallback() {
    super.connectedCallback();
    updateMetadata(this.heroSettings.title, this.heroSettings.metaDescription);
  }
}
