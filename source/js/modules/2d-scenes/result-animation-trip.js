import {GameVictoryScene} from './game-victory-scene';

export default () => {
  const canvas = document.getElementById(`canvas-result-trip`);
  const images = [
    {
      id: `plane`,
      x: 90,
      y: 50,
      size: 10,
      opacity: 0,
      transforms: {
        translateY: -10
      },
      source: `/img/results/trip/airplane.png`,
    },
    {
      id: `tree-1`,
      x: 65,
      y: 62,
      size: 5,
      opacity: 0,
      transforms: {
        translateY: 30
      },
      source: `/img/results/trip/tree.png`,
    },
    {
      id: `tree-2`,
      x: 60,
      y: 60,
      size: 5,
      opacity: 0,
      transforms: {
        translateY: 30
      },
      source: `/img/results/trip/tree 2.png`,
    },
    {
      id: `ice`,
      x: 50,
      y: 70,
      size: 50,
      opacity: 0,
      transforms: {
        translateY: 30
      },
      source: `/img/results/trip/ice.png`,
    },
    {
      id: `sea-calf`,
      x: 50,
      y: 60,
      size: 50,
      opacity: 0,
      transforms: {
        translateY: 30
      },
      source: `/img/results/trip/sea-calf-2.png`,
    },
    {
      id: `snowflake-1`,
      x: 25,
      y: 55,
      size: 30,
      opacity: 0,
      transforms: {
        rotate: -30
      },
      source: `/img/results/trip/snowflake.png`,
    },
    {
      id: `snowflake-2`,
      x: 75,
      y: 65,
      size: 15,
      opacity: 0,
      transforms: {
        rotate: 30,
        scaleX: -1
      },
      source: `/img/results/trip/snowflake.png`,
    },

  ];

  const scene = new GameVictoryScene({
    canvas,
    images
  });

  scene.prepare().then(() => scene.play());
};
