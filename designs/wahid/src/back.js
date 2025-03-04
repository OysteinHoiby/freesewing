import { constructMainDart, shapeSideSeam, dartPath } from './shared'

export default (part) => {
  let {
    points,
    Point,
    paths,
    Path,
    measurements,
    options,
    macro,
    complete,
    sa,
    paperless,
    snippets,
  } = part.shorthand()

  // Cleanup from Brian
  for (let i of Object.keys(paths)) delete paths[i]
  delete snippets.armholePitchNotch

  // Back inset
  let shoulderLen = points.shoulder.dist(points.neck)
  let backInset = shoulderLen * options.backInset
  points.armholePitch = points.armholePitch.shift(180, backInset)
  points.armholePitchCp1 = points.armholePitchCp1.shift(180, backInset)
  points.armholePitchCp2 = points.armholePitchCp2.shift(180, backInset)
  points.armholeHollow = points.armholeHollow.shift(180, backInset / 2)
  points.armholeHollowCp2 = points.armholeHollowCp2.shift(180, backInset / 2)
  points.armholeHollowCp1 = points.armholeHollowCp1.shift(180, backInset / 2)

  // Shoulder inset
  points.shoulder = points.shoulder.shiftTowards(points.neck, shoulderLen * options.shoulderInset)
  points.shoulderCp1 = points.shoulderCp1.shift(
    points.shoulder.angle(points.neck),
    shoulderLen * options.shoulderInset
  )

  // Neck inset
  points.neck = points.neck.shiftTowards(points.shoulder, shoulderLen * options.neckInset)
  points.neckCp2 = points.neck.shift(points.shoulder.angle(points.neck) + 90, shoulderLen * 0.1)

  // Center back dart
  points.cbNeck = new Path()
    .move(points.cbNeck)
    ._curve(points.neckCp2, points.neck)
    .shiftAlong(measurements.shoulderToShoulder * options.centerBackDart)
  points.cbNeckCp2 = new Point(0, points.armholePitch.y)

  // Construct main dart
  constructMainDart(part)

  // Add dart start and end point regardless of style or front or back
  points.dartStart = points.dartHemLeft
  points.dartEnd = points.dartHemRight

  // Shape side seam
  shapeSideSeam(part)

  // Back scye dart
  points._dartWidth = points.cbNeckCp2.shiftFractionTowards(
    points.armholePitch.rotate(options.backScyeDart, points.cbNeckCp2),
    1.2
  )
  points.armholePitchTop =
    options.backScyeDart > 0
      ? new Path()
          .move(points.armholePitch)
          .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
          .intersects(new Path().move(points.cbNeckCp2).line(points._dartWidth))
          .pop()
      : points.armholePitch.clone()

  // Rotate back scye dart into center back
  let toRotate = ['cbNeck', 'neckCp2', 'neck', 'shoulder', 'shoulderCp1']
  for (let p of toRotate) {
    points[p] = points[p].rotate(options.backScyeDart, points.cbNeckCp2)
  }

  // Seam line
  delete paths.cutonfold
  delete paths.saBase
  delete paths.sa
  paths.saBase = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve_(points.neckCp2, points.cbNeck)
    ._curve(points.cbNeckCp2, points.cbArmhole)
    .line(points.cbHem)
  paths.hemBase = new Path().move(points.cbHem).line(points.hem)
  paths.dart = dartPath(part)
  paths.seam = paths.saBase
    .clone()
    .line(points.dartHemLeft)
    .join(paths.dart)
    .line(points.hem)
    .attr('class', 'fabric')
  paths.saBase.render = false
  paths.hemBase.render = false
  paths.hemBase.render = false
  paths.dart.render = false

  if (complete) {
    //Grainline
    macro('grainline', {
      from: points.cbNeck.shift(0,(points.shoulder.dist(points.cbNeck)*0.1)),
      to: points.cbHem.shift(0,(points.cbHem.dist(points.hem)*0.1)),
      grainline: true,
    }) 
    //shifted the grainline points by 1% so the grainline stands alone from the sewing line.
    macro('scalebox', { at: new Point(points.logo.x, points.armholePitchCp2.y) })
    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(paths.hemBase.offset(sa))
        .close()
        .attr('class', 'fabric sa')
    }

    if (paperless) {
      macro('ld', {
        from: points.neck,
        to: points.shoulder,
        d: 15 + sa,
      })
      macro('hd', {
        from: points.cbArmhole,
        to: points.cbNeck,
        y: points.cbNeck.y - 15 - sa,
      })
      macro('hd', {
        from: points.cbArmhole,
        to: points.neck,
        y: points.cbNeck.y - 30 - sa,
      })
      macro('hd', {
        from: points.cbArmhole,
        to: points.shoulder,
        y: points.cbNeck.y - 45 - sa,
      })
      macro('hd', {
        from: points.cbArmhole,
        to: points.armholePitch,
        y: points.armholePitch.y,
      })
      macro('hd', {
        from: points.cbArmhole,
        to: points.dartTop,
        y: points.dartTop.y - 15,
      })
      macro('vd', {
        from: points.armhole,
        to: points.armholePitch,
        x: points.armhole.x + 15 + sa,
      })
      macro('vd', {
        from: points.armhole,
        to: points.shoulder,
        x: points.armhole.x + 30 + sa,
      })
      macro('vd', {
        from: points.armhole,
        to: points.neck,
        x: points.armhole.x + 45 + sa,
      })
      macro('vd', {
        from: points.hem,
        to: points.waist,
        x: points.armhole.x + 15 + sa,
      })
      macro('vd', {
        from: points.hem,
        to: points.armhole,
        x: points.armhole.x + 30 + sa,
      })
      macro('hd', {
        from: points.dartHemRight,
        to: points.hem,
        y: points.hem.y + 3 * sa + 15,
      })
      macro('hd', {
        from: points.cbHem,
        to: points.dartHemLeft,
        y: points.hem.y + 3 * sa + 15,
      })
      macro('hd', {
        from: points.cbHem,
        to: points.hem,
        y: points.hem.y + 3 * sa + 30,
      })
      macro('ld', {
        from: points.dartWaistLeft,
        to: points.dartWaistRight,
      })
      macro('ld', {
        from: points.dartHipLeft,
        to: points.dartHipRight,
      })
      macro('vd', {
        from: points.cbHem,
        to: points.cbArmhole,
        x: points.cbHem.x - 15 - sa,
      })
      macro('vd', {
        from: points.cbHem,
        to: points.cbNeck,
        x: points.cbHem.x - 30 - sa,
      })
      macro('vd', {
        from: points.cbHem,
        to: points.neck,
        x: points.cbHem.x - 45 - sa,
      })
    }
  }

  return part
}
