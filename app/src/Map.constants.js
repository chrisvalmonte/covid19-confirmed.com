export const clusterLayer = {
  filter: ['has', 'cases'],
  id: 'cluster-circle',
  paint: {
    'circle-color': '#51bbd6',
    'circle-radius': ['step', ['get', 'cases'], 20, 100, 30, 750, 40],
  },
  source: 'cluster-circle',
  type: 'circle',
};

export const clusterCountLayer = {
  filter: ['has', 'cases'],
  id: 'cluster-count',
  layout: {
    'text-field': '{cases}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
  source: 'cluster-count',
  type: 'symbol',
};
