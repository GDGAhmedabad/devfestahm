import { Dialog } from '@material/mwc-dialog';
import { customElement, property, query } from '@polymer/decorators';
import { PolymerElement, html } from '@polymer/polymer';
import '../components/hero/simple-hero';
import '../elements/footer-block';
import '../elements/shared-styles';
import { heroSettings, toBeAnnounce } from '../utils/data';
import { updateMetadata } from '../utils/metadata';

declare var Cropper: any;
@customElement('badge-page')
export class BadgePage extends PolymerElement {

  static get template() {
    return html`
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css">
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
          background: #e0e0e0;
          border-radius: 20px;
          text-align: center;
          height: 100%;
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

        .action {
          display: flex;
          flex-direction: column;
          margin-top: 20px;
          align-items: center;
        }
        .preview {
          display: flex;
          justify-content: space-around;
        }
        .profile-badge, .ticket-badge {
          flex: 0 0 50%;
          max-width: 50%;
          padding: 10px
        }

        @media screen and (max-width: 860px) {
          .input-panel,
          .preview-panel,
          .profile-badge, .ticket-badge {
            width: 100%;
            max-width: initial;
          }
          .preview-panel, .profile-badge, .ticket-badge {
            flex: 1;
          }
          .input {
            margin-bottom: 24px;
          }
          .preview {
            flex-direction: column;
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

        .cropper-container {
          height: 100%;
          width: 100%;
        }


        .dialog-image {
          width: 50%;
          height: 50%;
        }

        .ticket-container {
          width: 300px;
          height: 450px;
          border: 1px solid #ccc;
          position: relative;
          background-image: url('/images/badge-ticket.png');
          /* Updated background image */
          background-size: cover;
          background-position: center;
          border-radius: 10px;
          overflow: hidden;
          margin: 0 auto;
        }

        .ticket-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          /* border: 3px solid #fff; */
          /* Added border */
          position: absolute;
          top: 150px;
          left: 75px;
        }

      </style>

      <hero-block
        background-color="[[heroSettings.background.color]]"
        font-color="[[heroSettings.fontColor]]"
      >
        <div class="hero-title">[[heroSettings.title]]</div>
        <!-- <h2 class="name">[[tbd.unveilSoon]]</h2>
        <p class="hero-description">[[tbd.announcedSoon]]</p> -->
      </hero-block>

      <div class="container" layout vertical justified wrap center>
        <div class="input-panel">
          <p>
            Now that you are here, how about personalising your profile? Upload an image and generate a
            personalised badge with the GDG DevFest Ahmedabad 2025 frame. Also share your image using
            <a href="https://twitter.com/search?q=%23DevFestAhm&src=typeahead_click&f=live" target="_blank">
              #DevFestAhm
            </a>
            on different social platforms.
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
        </div>
        <div class="preview" layout  justified wrap>
          <div class="profile-badge">
            <div class="preview-panel">
              <canvas id="profile-canvas"></canvas>
              <div class="action">
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
                      d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71
                      1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71zM5 19c0
                      .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z"
                    />
                  </svg>
                </paper-button>
              </div>
            </div>
          </div>
          <div class="ticket-badge">
            <div class="preview-panel">
              <div class="ticket-container" id="ticket-container">
                <div class="ticket-background"></div>
                <img src="" alt="Uploaded Image" class="ticket-image" id="ticket-image">
              </div>
              <div class="action">
                <paper-button class="download-fab" on-click="downloadTicketBadge" id="download">
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
                      d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71
                      1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71zM5 19c0
                      .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z"
                    />
                  </svg>
                </paper-button>
              </div>
            </div>
          </div>
        </div>
        <mwc-dialog  class="dialog" id="dialog" open="[[open]]" heading="Image">

          <div>
            <img id="image-cropper" class="dialog-image">
          </div>

          <mwc-button slot="primaryAction" on-click="cropImage">Done</mwc-button>
        </mwc-dialog>
      </div>

      <footer-block></footer-block>
    `;
  }
  @query('#dialog')
  dialog!: Dialog;
  @property({ type: Boolean })
  open = false;
  private tbd = toBeAnnounce;
  private heroSettings = heroSettings.badge;
  canvas: any;
  ctx: any;
  image: any;
  shape = "original";
  banner = new Image();
  dpi = window.devicePixelRatio;

  cropper: any;
  imageCropper: any;
  onAfterEnter() {
    setTimeout(() => {
      this.setProfileCanvas();
    }, 1000);
    updateMetadata(this.heroSettings.title, this.heroSettings.metaDescription);
  }

  setProfileCanvas() {
    this.canvas = this.shadowRoot?.querySelector('#profile-canvas');
    this.ctx = this.canvas.getContext("2d");
    this.banner.setAttribute('crossOrigin', 'anonymous')
    this.banner.src = '/images/badge-profile.png';
    this.banner.onload = () => {
      this.ctx.imageSmoothingEnabled = false;
      this.draw();
    };
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
    this.open = false;
    if (e && e.target.files && e.target.files[0]) {
      this.open = true;
      const reader = new FileReader();
      reader.onload = (event:any) => {
        const img = new Image();
        img.onload = () => {
          this.image = img;
          this.draw();
        };
        img.src = event.target.result;
        // console.log("🚀 ~ file: badge-page.ts:399 ~ BadgePage ~ event.target.result:", event.target.result)
        this.imageCropper = this.shadowRoot?.querySelector('#image-cropper');
        this.imageCropper.src = event.target.result;
        this.initCropper();
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
    a.download = "devfestahm-profile-badge.png";
    a.href = url;
    a.click();
  };

  downloadTicketBadge() {
    const badgeContainer: any = this.shadowRoot?.querySelector('#ticket-container');

    // Create a canvas with a higher resolution
    const canvas = document.createElement('canvas');
    const context: any = canvas.getContext('2d');
    const scaleFactor = 2; // Adjust this scale factor as needed for better quality

    canvas.width = badgeContainer.offsetWidth * scaleFactor;
    canvas.height = badgeContainer.offsetHeight * scaleFactor;

    const backgroundImage = new Image();
    const ticketImage = this.shadowRoot?.querySelector('#ticket-image');

    backgroundImage.src = '/images/badge-ticket.png';
    backgroundImage.onload = function () {
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // Draw the uploaded image with a rounded clipping path
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 76 * scaleFactor;

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.closePath();
      context.clip();

      // Draw a border for the badge-image
      // context.lineWidth = 6; // Adjust border width as needed
      // context.strokeStyle = '#fff'; // Border color

      // Adjust the parameters to draw the badge-image in the center
      const ticketImageSize = 150 * scaleFactor;
      const ticketImageX = centerX - ticketImageSize / 2;
      const ticketImageY = centerY - ticketImageSize / 2;

      context.drawImage(
        ticketImage,
        ticketImageX,
        ticketImageY,
        ticketImageSize,
        ticketImageSize
      );

      context.stroke(); // Stroke the border

      context.restore();

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'devfestahm-ticket-badge.png';
      link.click();
    };
  }

  initCropper() {
    this.cropper = new Cropper(this.imageCropper, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
      dragMode: 'move'
    });
  }

  cropImage() {
    const ticketImage: any = this.shadowRoot?.querySelector('#ticket-image');
    const croppedImageData = this.cropper.getCroppedCanvas().toDataURL('image/png');

    // Set the cropped image as the badge image
    ticketImage.src = croppedImageData;

    // Hide the modal dialog
    this.open = false;

    // Destroy the cropper instance
    this.cropper.destroy();
    this.cropper = null;
  }
}
