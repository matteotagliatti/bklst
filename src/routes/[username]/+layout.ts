import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ params }) => {
  const { username } = params;
  return { username };
};
