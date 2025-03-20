
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class DataAppsControl
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  // Reference to DataApp IFrame HTMLElement
  private _dataAppIFrame: HTMLElement;

  // Reference to the control container HTMLDivElement
  // This element contains all elements of our custom control example
  private _container: HTMLDivElement;

  // Flag if control view has been rendered
  private _controlViewRendered: boolean;

  // Flag if script has been loaded
  private _scriptLoadComplete: boolean;

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement,
  ): void {
    this._container = container;
    this._controlViewRendered = false;
    this._scriptLoadComplete = false;
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    if (!this._controlViewRendered) {
      this._controlViewRendered = true;
      const id = context.parameters.dataAppId.raw;
      const token = context.parameters.dataAppToken.raw;
      id && token && this.renderDataAppIFrame(id, token);
    }
  }

  /**
   * Render IFrame HTML Element that hosts the DataApp and appends the IFrame to the control container
   */
  private renderDataAppIFrame(id: string, token: string): void {

    // Create the iFrame element
    this._dataAppIFrame = this.createIFrameElement();

    // Create div to harvest value
    const valDiv = document.createElement("div");
    valDiv.id = "keyOne";
    valDiv.innerHTML = "3";
    valDiv.style.display = "none";
    this._container.appendChild(valDiv);

    // Create div for the iFrame
    const iFrDiv = document.createElement("div");
    iFrDiv.id = "iFrame";
    iFrDiv.style.height = "600px";
    this._container.appendChild(iFrDiv);

    const daScript = document.createElement("script");
    // This url needs to be replaced with url for the deployed AI Squared instance for VPC deployments
    daScript.src =
      "https://api.squared.ai/enterprise/api/v1/data_apps_runner.js";
    daScript.addEventListener("load", () => this.setLoaded(true, id, token));
    this._container.appendChild(daScript);
    console.log(daScript);
  }

  // Method to invoke the DataApp script once its loaded
  private setLoaded(state: boolean, id: string, token: string): void {
    this._scriptLoadComplete = state;
    // console.log(+id);
    // console.log(token);
    const dataApp = new window.DataApp({
      dataAppId: +id,
      dataAppToken: token,
    });
    // console.log("Created DataApp");
    dataApp.runDataApp();
  }



  /**
   * Helper method to create an IFrame HTML Element
   */
  private createIFrameElement(): HTMLElement {
    const iFrameElement: HTMLElement = document.createElement("iframe");
    iFrameElement.setAttribute("class", "AISControl_IFrame");
    return iFrameElement;
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
   */
  public getOutputs(): IOutputs {
    // no-op: method not leveraged by this example custom control
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // no-op: method not leveraged by this example custom control
  }
}
