import { customElement } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import '../components/hero/simple-hero';
import '../elements/footer-block';
import '../elements/shared-styles';
import { heroSettings } from '../utils/data';
import { updateMetadata } from '../utils/metadata';

@customElement('badge-page')
export class BadgePage extends PolymerElement {

  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          --shadow-elevation-1: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
          0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
          --shadow-elevation-2: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
          0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .badge-container {
          margin: 0 auto;
          padding: 24px 16px;
          max-width: var(--max-container-width);
        }

        .input-panel {
          padding: 24px;
          width: 50%;
          max-width: 50%;
        }

        .input {
          margin-bottom: 36px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .input:last-child {
          margin-bottom: 0;
        }

        .input .title {
          font-size: 18px;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .select-container {
          display: flex;
          border-radius: 5px;
          border: 1px solid #cacaca;
          overflow: hidden;
        }

        .select-container .select {
          background-color: #fff;
          padding: 6px 12px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 100ms ease;
        }

        .select-container .select:not(:last-child) {
          border-right: 1px solid #cacaca;
        }

        .select-container .select[selected] {
          color: #fff;
          background-color: var(--default-primary-color);
        }

        .preview-panel {
          padding: 36px 0;
          flex: 0 0 50%;
          max-width: 50%;
          background: #e0e0e0;
          border-radius: 20px;
          text-align: center;
        }

        canvas {
          width: 500px;
          max-width: 80%;
        }

        .download-fab {
          cursor: pointer;
          margin: 15px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          width: 150px;
          height: 50px;
          background-color: var(--default-primary-color);
          box-shadow: var(--shadow-elevation-1);
          transition: background-color 100ms ease, box-shadow 100ms ease;
          color: #fff;
        }

        .download-fab:hover {
          background-color: #008aff;
          box-shadow: var(--shadow-elevation-2);
        }

        @media screen and (max-width: 860px) {
          .input-panel,
          .preview-panel {
            width: 100%;
            max-width: initial;
          }
          .preview-panel {
            flex: 1;
          }
          .input {
            margin-bottom: 24px;
          }
        }
        .inputfile + paper-button {
          color: #fff;
          background-color: var(--default-primary-color);
        }

        .inputfile + paper-button {
          max-width: 80%;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          display: inline-block;
          overflow: hidden;
          padding: 0.625rem 1.25rem;
          border-radius: 5px;
        }
        .inputfile {
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          position: absolute;
          z-index: -1;
        }
        .inputfile:focus + paper-button,
        .inputfile.has-focus + paper-button,
        .inputfile + paper-button:hover {
            background-color: #008aff;
        }

        canvas { image-rendering: pixelated; image-rendering: optimizespeed; }

      </style>

      <hero-block
        background-color="[[heroSettings.background.color]]"
        font-color="[[heroSettings.fontColor]]"
      >
        <div class="hero-title">[[heroSettings.title]]</div>
      </hero-block>

      <div class="container" layout horizontal justified wrap center>
        <div class="input-panel">
          <p>
            Now that you are here, how about personalising your profile? Upload an image and generate a personalised badge with the GDG DevFest Ahmedabad 2022 frame. Also share your image using <a href="https://twitter.com/search?q=%23DevFestAhm&src=typeahead_click&f=live" target="_blank">#DevFestAhm</a> on different social platforms.
          </p>
          <div class="input">
            <input
              class="profile-input inputfile"
              type="file"
              accept="image/*"
              on-change="upload"
              name="file"
              id="file"
            />
            <paper-button>
              <label for="file">Upload Image</label>
            </paper-button>
          </div>
          <div class="input">
            <label class="title">Image Shape</label>
            <div class="select-container">
              <div
                class="select"
                id="original"
                selected
                on-click="changeShape"
              >
                Original
              </div>
              <div class="select" id="square" on-click="changeShape">
                Square
              </div>
              <div class="select" id="circle" on-click="changeShape">
                Circle
              </div>
            </div>
          </div>
        </div>
        <div class="preview-panel">
          <canvas></canvas>
          <paper-button class="download-fab" on-click="download" id="download">
            Download
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="#fff"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71zM5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z"
              />
            </svg>
          </paper-button>
        </div>
      </div>

      <footer-block></footer-block>
    `;
  }

  private heroSettings = heroSettings.badge;
  canvas: any;
  ctx: any;
  image: any;
  shape = "original";
  banner = new Image();
  dpi = window.devicePixelRatio;
  onAfterEnter() {
    setTimeout(() => {
      this.canvas = this.shadowRoot?.querySelector('canvas');
      this.ctx = this.canvas.getContext("2d");
      this.banner.setAttribute('crossOrigin', 'anonymous')
      this.banner.src = '/images/devfestahm22-badge-frame.jpg';
      this.banner.onload = () => {
        this.ctx.imageSmoothingEnabled = false;
        this.draw();
      };
    }, 1000);
    updateMetadata(this.heroSettings.title, this.heroSettings.metaDescription);
  }

  changeShape(event: any) {
    const original:any = this.shadowRoot?.querySelector(
      ".select-container .select#original"
    );
    const square:any = this.shadowRoot?.querySelector(".select-container .select#square");
    const circle:any = this.shadowRoot?.querySelector(".select-container .select#circle");
    const type: any = event.target.id;
    this.shape = event.target.id;
    switch (type) {
      case "original": {
        original.setAttribute("selected", "");
        square.removeAttribute("selected");
        circle.removeAttribute("selected");
        break;
      }
      case "square": {
        square.setAttribute("selected", "");
        original.removeAttribute("selected");
        circle.removeAttribute("selected");
        break;
      }
      case "circle": {
        circle.setAttribute("selected", "");
        original.removeAttribute("selected");
        square.removeAttribute("selected");
        break;
      }
    }
    this.draw();
  };

  upload = (e:any) => {
    if (e && e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event:any) => {
        const img = new Image();
        img.onload = () => {
          this.image = img;
          this.draw();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  draw = () => {
    if (this.image) {
      switch (this.shape) {
        case "original": {
          this.canvas.width = this.image.width;
          this.canvas.height = this.image.height;
          this.ctx.drawImage(this.image, 0, 0);
          break;
        }
        default: {
          const size = Math.min(this.image.width, this.image.height);
          this.canvas.width = 500 * this.dpi;
          this.canvas.height = 500 * this.dpi;
          const hRatio = this.canvas.width / this.image.width;
          const vRatio = this.canvas.height / this.image.height;
          const ratio = Math.max(hRatio, vRatio);
          const x = (this.canvas.width - this.image.width * ratio) / 2;
          const y = (this.canvas.height - this.image.height * ratio) / 2;
          this.ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            x,
            y,
            this.image.width * ratio,
            this.image.height * ratio
          );
          break;
        }
      }
    } else {
      this.ctx.canvas.width = 500 * this.dpi;
      this.ctx.canvas.height = 500 * this.dpi;
      this.ctx.fillStyle = "#fff";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    const height = (this.banner.height / this.banner.width) * this.canvas.width;
    const y = this.canvas.height - height;
    const fontSize = this.canvas.width / 17.2;
    this.ctx.drawImage(
      this.banner,
      0,
      0,
      this.banner.width,
      this.banner.height,
      0,
      y,
      this.canvas.width,
      height
    );

    this.ctx.fillStyle = "#757575";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = `${fontSize}px Google Sans, sans-serif`;

    if (this.shape === "circle") {
      this.ctx.globalCompositeOperation = "destination-in";
      this.ctx.beginPath();
      this.ctx.arc(
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.canvas.height / 2,
        0,
        Math.PI * 2
      );
      this.ctx.closePath();
      this.ctx.fill();
    }
  };

  download = () => {
    const a = document.createElement("a");
    const url = this.canvas.toDataURL("image/png;base64");
    a.download = "devfestahm22-profile-badge.png";
    a.href = url;
    a.click();
  };
}
