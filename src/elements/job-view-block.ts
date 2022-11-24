import { customElement, property } from '@polymer/decorators';
import '@polymer/iron-icon';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import { RootState } from '../store';
import { ReduxMixin } from '../store/mixin';
import { initialUiState } from '../store/ui/state';
import { jobViewBlock } from '../utils/data';
import '../utils/icons';
import './shared-styles';

@customElement('job-view-block')
export class JobViewBlock extends ReduxMixin(PolymerElement) {
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
          font-size: 24px;
          line-height: 1.5;
          margin: 0 0 16px;
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
            font-size: 32px;
            margin: 0 0 24px;
            text-align: center;
          }
        }
      </style>

      <div class="container" layout vertical center$="[[viewport.isTabletPlus]]">
        <div class="description">[[jobViewBlock.callToAction.description]]</div>
        <a class="cta-button" href="[[jobViewBlock.callToAction.link]]">
          <paper-button
            class="animated icon-right"
          >
            <span class="cta-label">[[jobViewBlock.callToAction.label]]</span>
            <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
          </paper-button>
        </a>
      </div>
    `;
  }

  private jobViewBlock = jobViewBlock;

  @property({ type: Object })
  private viewport = initialUiState.viewport;

  override stateChanged(state: RootState) {
    this.viewport = state.ui.viewport;
  }

}
