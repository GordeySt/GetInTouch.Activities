import { Fragment } from "react";
import { Tab } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { UploadPhotoDropzone } from "./UploadPhotoDropzone";

const panes = [
  {
    menuItem: { key: "add", content: "Add Photo", icon: "photo" },
    render: () => <UploadPhotoDropzone />,
  },
  {
    menuItem: { key: "resize", content: "Resize Photo", icon: "compress" },
    render: () => <Tab.Pane>Resize Photo</Tab.Pane>,
  },
  {
    menuItem: {
      key: "review",
      content: "Review and Upload",
      icon: "cloud upload",
    },
    render: () => <Tab.Pane>Review and Upload</Tab.Pane>,
  },
];

export const UploadPhotoWidget = observer(() => (
  <Fragment>
    <Tab menu={{ fluid: true }} menuPosition="right" panes={panes} />
  </Fragment>
));
