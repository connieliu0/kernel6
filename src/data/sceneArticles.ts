export interface SceneArticle {
  title: string;
  author: string;
  description: string;
  /** Asset src — tooltip pins here when any member of the group is hovered. */
  tooltipAnchor: string;
  tooltipPlacement?: "above" | "below";
}

/** Tooltip copy for scene assets — keyed by articleId. */
export const sceneArticles: Record<string, SceneArticle> = {
  corn: {
    author: "Vicki Xu",
    title: "Can AI Grow Corn?",
    description: "For Farmer Fred, the proof is in the corn.",
    tooltipAnchor: "/assets/corn1.png",
    tooltipPlacement: "above",
  },
  sandwich: {
    author: "Justin Lin",
    title: "What Makes The Sandwich Special",
    description:
      "The factories that make frozen sealed crustless sandwiches are ecosystems of craft.",
    tooltipAnchor: "/assets/food1.png",
  },
  shrimp: {
    author: "Alex Wennerberg",
    title: "Who Cares About the Shrimp?",
    description:
      "Shrimp are, in many ways, a model moral organism.",
    tooltipAnchor: "/assets/shrimp 1.png",
    tooltipPlacement: "below",
  },
  phone: {
    author: "Evan Philippe Hamilton",
    title: "Phone Eats First",
    description:
      "The feed to table restaurant as the quintessential dining experience of our time.",
    tooltipAnchor: "/assets/food1.png",
  },
  retreat: {
    author: "Evan Philippe Hamilton",
    title: "Top 5 Things I Learned From My Dead Wife",
    description:
      "A middle-aged man searches for meaning at a wellness retreat.",
    tooltipAnchor: "/assets/golf.png",
  }
  // },
  // "infinite-feed": {
  //   author: "Tomás Guarna",
  //   title: "A Media History of the Infinite Feed",
  //   description: "Doomscrolling was a design choice.",
  //   tooltipAnchor: "/assets/Cat 1.png",
  // },
  // "johor-land": {
  //   author: "Ann Irvina Ravinther",
  //   title: "Changing hands, Johor's land",
  //   description:
  //     "A triptych of resource exploitation in Johor, Malaysia.",
  //   tooltipAnchor: "/assets/wrench 1.png",
  // },
  // "fried-egg": {
  //   author: "Sophie Wu",
  //   title: "How to Cite a Fried Egg",
  //   description: "How the Wikipedia article for sausage gets made.",
  //   tooltipAnchor: "/assets/hammer 1.png",
  // },
  // online: {
  //   author: "Isabel Paban Freed",
  //   title: "Problems of the Online",
  //   description: "Some questions of consumption.",
  //   tooltipAnchor: "/assets/Golf.png",
  // },
};
