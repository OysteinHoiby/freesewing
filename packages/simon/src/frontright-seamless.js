import { addButtons } from "./shared";

export default part => {
  let {
    sa,
    Point,
    points,
    Path,
    paths,
    complete,
    paperless,
    macro,
    options
  } = part.shorthand();

  let width = options.buttonPlacketWidth;
  points.placketTopFold1 = points.cfNeck.shift(0, width / 2);
  points.placketTopFold2 = points.cfNeck.shift(0, width * 1.5);
  points.placketTopEdge = points.cfNeck.shift(0, width * 2.5);
  points.placketBottomFold1 = points.cfHem.shift(0, width / 2);
  points.placketBottomFold2 = points.cfHem.shift(0, width * 1.5);
  points.placketBottomEdge = points.cfHem.shift(0, width * 2.5);
  paths.seam
    .line(points.placketTopEdge)
    .line(points.placketBottomEdge)
    .line(points.cfHem)
    .close();

  // Complete pattern?
  if (complete) {
    // Placket help lines
    paths.frontCenter = new Path()
      .move(points.cfNeck)
      .line(points.cfHem)
      .attr("class", "help");
    paths.placketFold1 = new Path()
      .move(points.placketTopFold1)
      .line(points.placketBottomFold1)
      .attr("class", "dotted");
    paths.placketFold2 = new Path()
      .move(points.placketTopFold2)
      .line(points.placketBottomFold2)
      .attr("class", "dotted");
    macro("sprinkle", {
      snippet: "notch",
      on: [
        "placketTopFold1",
        "placketTopFold2",
        "placketBottomFold1",
        "placketBottomFold2",
        "cfNeck",
        "cfHem"
      ]
    });

    // Buttons
    addButtons(part);

    // Title
    macro("title", { at: points.title, nr: 1, title: "frontRight" });

    if (sa) {
      paths.saFromArmhole
        .line(new Point(points.placketTopEdge.x, points.placketTopEdge.y - sa))
        .line(points.placketTopEdge)
        .move(points.placketBottomEdge)
        .line(points.placketBottomEdge.shift(-90, sa * 3))
        .line(paths.hemSa.start());
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part;
};
