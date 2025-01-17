import ReactDOM from 'react-dom';
import { MapControl, MapControlProps, withLeaflet } from 'react-leaflet';
import {
  Control, Map, DomUtil, DomEvent,
} from 'leaflet';

const DumbControl = Control.extend({
  options: {
    className: '',
    onOff: '',
    handleOff: function noop() {},
  },

  onAdd(/* map */) {
    const controlDiv = DomUtil.create('div', this.options.className);
    DomEvent.disableClickPropagation(controlDiv);
    return controlDiv;
  },

  onRemove(map: Map) {
    if (this.options.onOff) {
      map.off(this.options.onOff, this.options.handleOff, this);
    }

    return this;
  },
});

export default withLeaflet(
  class LeafletControl extends MapControl {
    createLeafletElement(props: MapControlProps) {
      return new DumbControl({ ...props });
    }

    componentDidMount() {
      // @ts-ignore
      super.componentDidMount();

      // This is needed because the control is only attached to the map in
      // MapControl's componentDidMount, so the container is not available
      // until this is called. We need to now force a render so that the
      // portal and children are actually rendered.
      this.forceUpdate();
    }

    render() {
      if (!this.leafletElement || !this.leafletElement.getContainer()) {
        return null;
      }
      return ReactDOM.createPortal(
        this.props.children,
        this.leafletElement.getContainer()!,
      );
    }
  },
);
