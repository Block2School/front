import mixpanel from "mixpanel-browser";

export class MixPanelTracking {

  private static _instance: MixPanelTracking;

  public static getInstance(): MixPanelTracking {

    if (MixPanelTracking._instance == null)
      return (MixPanelTracking._instance = new MixPanelTracking())
    return this._instance;
  }

  public constructor() {
    if (MixPanelTracking._instance) {
      throw new Error('Error: Instance creation of MixPanelTracking is not allowed. Use MixPanelTracking.getInstance() instead')
    }
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID || '', {debug: true, ignore_dnt: true})
    mixpanel.track("page_view")
  }

  protected track(name: string, data: object = {}) {
    mixpanel.track(name, data)
  }

  public pageViewed() {
    this.track("page_viewed")
  }

  public buttonClicked(name: string) {
    this.track("button_clicked", {name})
  }

  public TutorialViewed({tutorial}: {tutorial: any}) {
    this.track("tutoriel_viewed", {
      id: tutorial.id,
      title: tutorial.title
    })
  }
}