interface Social {
  name: string;
  url: string;
}

interface IBrowserTab {
  path: string;
  openedAt: number;
}

interface IWindow {
  title: string;
  openedAt: number;
  shouldMaximize: boolean;
  maximized: boolean;
  minimized: boolean;
}
