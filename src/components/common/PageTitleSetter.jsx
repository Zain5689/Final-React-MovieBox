import { useEffect } from "react";
import { useMatches } from "react-router";

export default function PageTitleSetter() {
  const matches = useMatches();

  useEffect(() => {
    const matchedRoute = matches.find(
      (match) => match.handle && match.handle.title,
    );
    document.title = matchedRoute ? matchedRoute.handle.title : "Movie App";
  }, [matches]);

  return null;
}
