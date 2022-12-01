import { customElement, property } from '@polymer/decorators';
import '@polymer/iron-icon';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import { RootState } from '../store';
import { ReduxMixin } from '../store/mixin';
import { initialUiState } from '../store/ui/state';
import { jobOpenings } from '../utils/data';
import '../utils/icons';
import './shared-styles';

@customElement('job-openings-block')
export class JobOpeningsBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          display: flex;
          width: 100%;
          background: var(--default-primary-color);
          color: #fff;
          padding: 16px 0;
        }

        .description {
          font-size: 18px;
          line-height: 1.5;
          margin: 16px 0;
        }

        .disclaimer {
          font-size: 14px;
          margin-bottom: 15px;
          text-align: center;
        }

        paper-button {
          color: #fff;
        }

        paper-button[disabled] {
          background: var(--default-primary-color);
          color: #fff;
        }

        @media (min-width: 640px) {
          :host {
            padding: 32px 0;
          }

          .description {
            font-size: 18px;
            margin: 24px 0;
            text-align: center;
          }
        }
      </style>

      <div class="container" layout vertical center$="[[viewport.isTabletPlus]]">
        <h2>[[jobOpenings.title]]</h2>
        <div class="description">[[jobOpenings.callToAction.description]]</div>
        <div class="disclaimer">
          <strong>Disclaimer:</strong> [[jobOpenings.disclaimer]]
        </div>
        <a class="cta-button" href="[[jobOpenings.callToAction.link]]">
          <paper-button
            class="animated icon-right"
          >
            <span class="cta-label">[[jobOpenings.callToAction.label]]</span>
            <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
          </paper-button>
        </a>
      </div>
    `;
  }

  private jobOpenings = jobOpenings;

  @property({ type: Object })
  private viewport = initialUiState.viewport;

  override stateChanged(state: RootState) {
    this.viewport = state.ui.viewport;
  }

}
