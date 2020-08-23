import { useMutation } from '@apollo/react-hooks';
import {
  CREATE_GEOS, CreateGeos, CreateGeosVariables,
  CREATE_LAYER, CreateLayer, CreateLayerVariables,
} from '$apollo/mutations';
import {
  GET_GEOS, GetGeos, GetGeosVariables,
  GET_LAYERS, GetLayers, GetLayersVariables,
} from '$apollo/queries';

export const useCreateLayerMutation = (
  mapId?: string | null,
) => useMutation<CreateLayer, CreateLayerVariables>(CREATE_LAYER, {
  update: (cache, { data }) => {
    const options = {
      query: GET_LAYERS,
      variables: {
        mapId,
      },
    };

    const returnedLayer = data!.createLayer;
    const cashedLayers = cache.readQuery<GetLayers, GetLayersVariables>(options);
    cache.writeQuery<GetLayers, GetLayersVariables>({
      ...options,
      data: {
        layers: [...cashedLayers!.layers, returnedLayer],
      },
    });
  },
});

export const useCreateGeosMutation = (
  layerId?: string,
) => useMutation<CreateGeos, CreateGeosVariables>(CREATE_GEOS, {
  update: (cache, { data }) => {
    if (!layerId) return;

    const options = {
      query: GET_GEOS,
      variables: {
        layerId,
      },
    };

    const returnedGeos = data!.createGeos;
    const cachedGeos = cache.readQuery<GetGeos, GetGeosVariables>(options) || { geos: [] };

    cache.writeQuery<GetGeos, GetGeosVariables>({
      ...options,
      data: {
        geos: [...cachedGeos.geos, ...returnedGeos],
      },
    });
  },
});
