import { Dialog } from '@material/mwc-dialog';
import { customElement, query } from '@polymer/decorators';
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
    <script src="https://allevents.in/scripts/public/ae-plugin-lib-button.js"></script>

      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          height: 100% --default-primary-color: #ffffff;
          --card-shadow: rgba(0, 0, 0, 0.1);
          --step-padding: 20px;
        }

        .registration-container {
          margin: 0 auto;
          padding: 10px 16px;
          max-width: var(--max-container-width);
        }

        .registration-container {
          p {
            padding-left: 15px;
          }
        }

        .nav-inline {
          padding: 0;
        }

        .nav-inline li {
          display: inline-block;
        }

        .nav-inline a {
          color: var(--footer-text-color);
          text-decoration: none;
        }

        .social-group.share-block {
          margin-bottom: 17px;
        }

        .steps {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 20px;
          padding: 8px 8px 24px 14px;
          margin-top: 24px;
        }

        .step-block {
          position: relative;
          color: #333;
          box-shadow: 0 0 12px var(--card-shadow);
          padding: var(--step-padding);
          border-radius: 10px;
          box-sizing: border-box;
          border-left: 6px solid transparent;
        }

        .step-name {
          position: absolute;
          top: -12px;
          left: 20px;
          background-color: #333;
          color: #fff;
          padding: 5px 12px;
          border-radius: 5px;
          font-weight: bold;
          font-size: 14px;
        }

        /* Step-specific border colors */
        .step-red {
          border-left-color: #e53935;
        }

        .step-blue {
          border-left-color: #1e88e5;
        }

        .step-purple {
          border-left-color: #8e24aa;
        }

        .step-orange {
          border-left-color: #fb8c00;
        }

        .step-description {
          margin-top: 20px;
          font-size: 16px;
          line-height: 1.6;
        }

        .register-btn {
          text-align: center;
          margin-top: 30px;
        }

        paper-button {
          background-color: #1e88e5;
          color: #fff;
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        paper-button:hover {
          background-color: #1565c0;
        }

        @media (max-width: 768px) {
          .steps {
            flex-direction: column;
            align-items: center;
          }

          .step-block {
            width: 100%;
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

        .ticket-types {
          margin-bottom: 40px;
        }

        .ticket-container {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 24px;
        }

        .ticket-card {
          background: #fff;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 24px 30px;
          flex: 1;
          min-width: 320px;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.3s ease;
          border-top: 8px solid transparent;
        }

        .ticket-card:hover {
          box-shadow: 0 12px 20px rgba(0,0,0,0.15);
        }

        .ticket-card.early-bird {
          border-top-color: #007bff;
        }

        .ticket-card.regular {
          border-top-color: #28a745;
        }

        .ticket-title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 18px;
          color: #222;
        }

        .ticket-list {
          list-style: none;
          padding-left: 20px;
          color: #555;
          font-size: 16px;
        }

        .ticket-list li {
          position: relative;
          margin-bottom: 14px;
          padding-left: 24px;
        }

        .ticket-list li::before {
          content: "✓";
          color: #007bff;
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .ticket-card.regular .ticket-list li::before {
          color: #28a745;
        }

        .section-note {
          text-align: center;
          font-style: italic;
          color: #666;
          margin-top: 12px;
          font-size: 15px;
        }
        @media (max-width: 768px) {
          .ticket-container {
            flex-direction: column;
            align-items: center;
          }
        }
        h1 {
          font-weight: 700;
          padding-bottom: 8px;
        }
      </style>

      <simple-hero page="registration"></simple-hero>

      <div class="registration-container">
        <div>
          <h1>Important Instructions</h1>
          <ul>
            <li>
              Marking RSVP on our official
              <a href="https://gdg.community.dev/gdg-ahmedabad/" target="_blank">GDG Ahmedabad page</a> or
              <a href="https://www.meetup.com/GDG-Ahmedabad/" target="_blank">meetup page</a>
              is <b>not</b> considered a confirmed registration or a ticket.
            </li>
            <li>
              If you haven't joined our GDG Ahmedabad community yet, we highly recommend
              becoming a member on <a href="https://www.meetup.com/GDG-Ahmedabad/" target="_blank">Meetup</a>
              to stay updated with all our future events.
            </li>
            <li>
              Make sure to follow us on our social channels for timely updates and announcements.
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
          <h1>Super Important Instructions</h1>
          <p>
            This event is fully community-driven and volunteer-powered. Let's respect each other's time and energy by
            following these guidelines:
          </p>
          <ul>
            <li>
              There is <b>no direct or indirect way</b> to get tickets. Please don't contact the organizing team or volunteers
              for a ticket request.
            </li>
            <li>
              <b>No on-the-spot registrations</b> will be allowed at the venue. Only confirmed ticket holders will be allowed
              entry.
            </li>
            <li>
              We request everyone to <b>not pressure</b> organizers for ticket confirmations. We know the excitement is high
              (and we love that!), but to keep things fair and manageable, we curate entries based on the details submitted in
              the registration form.
            </li>
            <li>
              We're doing our best to accommodate as many passionate folks as possible, but venue and resource limitations
              mean we have to prioritize curated entries that align with our event's vision.
            </li>
            <li>
              Let's come together to make this event a smooth, joyful, and meaningful experience for everyone — speakers,
              attendees, and volunteers alike!
            </li>
          </ul>
        </div>

        <div>
          <h1>Registration Process</h1>

          <div class="steps">
            <!-- Step 1 -->
            <div class="step-block step-red">
              <div class="step-name">Step 1</div>
              <div class="step-description">
                <p><strong>Registration Announcement via AllEvents</strong><br>
                  We'll announce the registration link on our website and social media, using the AllEvents platform.</p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="step-block step-blue">
              <div class="step-name">Step 2</div>
              <div class="step-description">
                <p><strong>Register for a Ticket</strong><br>
                  Choose your preferred track and ticket type (Early Bird or Regular).<br>
                  📌 Be sure to read the “Ticket Policies and Types” before proceeding.</p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="step-block step-blue">
              <div class="step-name">Step 3</div>
              <div class="step-description">
                <p><strong>Curation of Entries (For Regular Tickets)</strong><br>
                  Our team will evaluate entries based on:
                <ul>
                  <li>Selected track & interest area</li>
                  <li>Past participation in GDG Ahmedabad events</li>
                  <li>No-show history (if any)</li>
                  <li>Your passion and application quality</li>
                </ul>
                </p>
                <p>We want to ensure we prioritize dedicated and genuinely interested community members.</p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="step-block step-purple">
              <div class="step-name">Step 4</div>
              <div class="step-description">
                <p><strong>Shortlisting & Payment Invitation</strong><br>
                  If selected, you'll receive an email invitation with a link to complete payment.<br>
                  ✅ Early Bird tickets are confirmed instantly upon payment.</p>
              </div>
            </div>

            <!-- Step 5 -->
            <div class="step-block step-blue">
              <div class="step-name">Step 5</div>
              <div class="step-description">
                <p><strong>Confirmation of Registration</strong><br>
                  Once payment is completed, you'll receive an e-ticket (with a QR code) via email. 🎉</p>
              </div>
            </div>

            <!-- Step 6 -->
            <div class="step-block step-orange">
              <div class="step-name">Step 6</div>
              <div class="step-description">
                <p><strong>Entry Verification at the Event</strong><br>
                  Bring:
                <ul>
                  <li>Your confirmed e-ticket (QR Code)</li>
                  <li>A valid government-issued photo ID (Aadhaar, PAN, etc.)</li>
                </ul>
                This ensures a smooth and secure check-in experience.</p>
              </div>
            </div>
          </div>
          <p class="section-note">This helps us keep the event secure and ensure a smooth experience for all.</p>
        </div>
        <div>
          <h1>Ticket Policies</h1>
          <p>
            <b>Tickets are non-refundable and non-transferrable</b> under any circumstances.
          </p>
          <p><b>Select the track you're most interested in</b> at the time of registration. This is <b>very important</b> as
            we are running four parallel tracks this year:</p>
          <ol>
            <li>
              <b>Mobile Track (Android / Flutter)</b>
            </li>
            <li>
              <b>Cloud Track</b>
            </li>
            <li>
              <b>AI/ML Track</b>
            </li>
            <li>
              <b>Cloud Hands-on Workshop Track</b>
            </li>
          </ol>
          <p>
            <b>Track-specific access is enforced:</b> For example, if you're registered for the Mobile Track, you'll get
            priority access to that room. Only if seats remain, participants from other tracks may be allowed — <b>but no
              guarantee</b>.
          </p>
          <p>This helps us avoid overcrowding and ensures that everyone gets the most out of the sessions they’re truly
            passionate about.</p>
        </div>
        <section class="ticket-types">
          <h1>Ticket Types</h1>
          <div class="ticket-container">
            <div class="ticket-card early-bird">
              <div class="ticket-title">Early Bird Tickets</div>
              <ul class="ticket-list">
                <li>Straightforward and simple</li>
                <li>First-come, first-served</li>
                <li>Instant confirmed ticket after payment</li>
                <li>No curation or selection needed</li>
              </ul>
            </div>
            <div class="ticket-card regular">
              <div class="ticket-title">Regular Tickets</div>
              <ul class="ticket-list">
                <li>Shortlisting process</li>
                <li>Complete registration form with thoughtful responses</li>
                <li>Team curates entries</li>
                <li>Selected participants get email invitation for payment</li>
              </ul>
            </div>
          </div>
          <p class="section-note">This balances early excitement with curated participation to ensure quality interactions.</p>
        </section>
        <div class="register-btn">
          <paper-button primary data-event-id="80001474730286" data-ticket-id="0" class="ae-ticket-book-button"
            data-aff="u0" on-click="showTicketDialog" >
            <iron-icon icon="hoverboard:ticket"></iron-icon>
            Register Now
          </paper-button>
        </div>
      </div>

      <mwc-dialog id="dialog" open="[[buyTicket]]" escapeKeyAction="" scrimClickAction="" >
        <div>
        <iframe src='https://allevents.in/manage/tickets/book.php?event_id=80001474730286&auto_fill=1&platform=iframe&hide_details=1&aff=u0' style='width:100%;height:518px;border:1px solid #efefef;'></iframe><span class='consent-text' style='font-size: 12px;'>Powered by <a target='_blank' href='https://allevents.in/manage/create.php?utm_source=booking-plugin&utm_campaign=20763471&utm_medium=plugin&utm_content=create'><img src='https://cdn2.allevents.in/transup/a4/b7dd5e5fdb47708041855344e26645/logo-with-glow-1-.png' width='90' alt='AllEvents.in'></a></span>
        </div>
        <mwc-button on-click="closeDialog" slot="primaryAction" dialogAction="close">
          Close
        </mwc-button>
      </mwc-dialog>
      <footer-block></footer-block>
    `;
  }

  private heroSettings = heroSettings.registration;
  private socialNetwork = socialNetwork;
  private registerNow = registerNow;
  private registerClosed = registerClosed;
  private buyTicket = false;
  @query('#dialog')
  dialog!: Dialog;

  override ready() {
    super.ready();
    this.dialog.addEventListener('closed', () => this.closeDialog());
  }

  override connectedCallback() {
    super.connectedCallback();
    updateMetadata(this.heroSettings.title, this.heroSettings.metaDescription);
  }

  private showTicketDialog() {
    this.buyTicket = true;
  }

  private closeDialog() {
    this.buyTicket = false;
  }
}
