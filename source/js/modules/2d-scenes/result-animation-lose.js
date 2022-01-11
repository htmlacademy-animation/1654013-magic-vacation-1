import {GameLoseScene} from './game-lose-scene';

export default (onSceneAnimationReady) => {
  const canvas = document.getElementById(`canvas-result-lose`);
  const images = [
    {
      id: `lock`,
      x: 50,
      y: 50,
      size: 20,
      opacity: 0,
      transforms: {
        scaleX: 0.7,
        scaleY: 0.7,
      },
      source: `/img/results/lose/lock.png`
    },
    {
      id: `crocodile`,
      x: 80,
      y: 40,
      size: 80,
      opacity: 0,
      transforms: {
        rotate: 15
      },
      source: `/img/results/lose/crocodile.png`
    },
    {
      id: `drop`,
      x: 46,
      y: 57,
      size: 2,
      opacity: 0,
      transforms: {
        translateX: 0,
        scaleY: 0,
      },
      source: `/img/results/lose/drop.png`
    },
    {
      id: `flamingo`,
      x: 50,
      y: 50,
      size: 10,
      opacity: 0,
      transforms: {
        rotate: 30,
        scaleX: 0.2,
        scaleY: 0.2,
      },
      source: `/img/results/lose/flamingo.png`
    },
    {
      id: `watermelon`,
      x: 50,
      y: 50,
      size: 10,
      opacity: 0,
      transforms: {
        rotate: 45,
        scaleX: 0.2,
        scaleY: 0.2,
      },
      source: `/img/results/lose/watermelon.png`
    },
    {
      id: `leaf`,
      x: 50,
      y: 50,
      size: 10,
      opacity: 0,
      transforms: {
        rotate: -20,
        scaleX: 0.2,
        scaleY: 0.2,
      },
      source: `/img/results/lose/leaf.png`
    },
    {
      id: `snowflake`,
      x: 50,
      y: 50,
      size: 10,
      opacity: 0,
      transforms: {
        rotate: -20,
        scaleX: 0.2,
        scaleY: 0.2,
      },
      source: `/img/results/lose/snowflake.png`
    },
    {
      id: `planet`,
      x: 50,
      y: 50,
      size: 10,
      opacity: 0,
      transforms: {
        rotate: 45,
        scaleX: 0.2,
        scaleY: 0.2,
      },
      source: `/img/results/lose/saturn.png`
    },
  ];

  const scene = new GameLoseScene({
    canvas,
    images,
  });

  scene.prepare().then(() => {
    onSceneAnimationReady();
    scene.play();
  });
};
