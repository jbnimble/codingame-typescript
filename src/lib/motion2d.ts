
/**
 * Motion2D - two dimensional motion equations
 */
export class Motion2D {

  /*
    D = change in direction
    A = acceleration in direction
    V0 = initial velocity in direction

    D = V0 * t + 0.5 * A * t^2
    D = 0.5 * t * (V0 + V)
    V = V0 + A * t
    V = sqrt[V0^2 + 2 * A * D]
    t = (2 * D) / (V0 + V)

    V0y = V0 * sin(angle)
    D = y - y0
    Vy = sqrt[V0y^2 + 2 * A * D]
  */
  /**
   * Calculate the velocity at a given distance
   * starting velocity
   * angle in degrees
   * acceleration, generally gravity
   *
   * y  => y starting point
   * y0 => y ending point
   * A  => acceleration (gravity)
   * angle => angle
   * V0 => magnitude
   *
   * V0y = V0 * sin(angle)
   * D   = y - y0
   * Vy  = sqrt[V0y^2 + 2 * A * D]
   */
  public static velocity(locationBeg:number, locationEnd:number, acceleration:number, initialVelocity:number) {
    let distance = locationBeg - locationEnd;
    let velocity = Math.sqrt(Math.pow(initialVelocity,2) + 2 * acceleration * distance);
    return velocity;
  }

  public static velocityInitialX(angle:number, magnitude:number) {
    return magnitude * Math.cos(angle);
  }

  public static velocityInitialY(angle:number, magnitude:number) {
    return magnitude * Math.sin(angle);
  }
  /**
   * Get the time it will take to get from the initialVelocity to the finalVelocity given the amount of acceleration
   * Vy = V0y + Ay * t
   * t = Vy / (V0y + Ay)
   */
  public static time(initialVelocity:number, finalVelocity:number, acceleration:number) {
    return finalVelocity / (initialVelocity + acceleration);
  }
  /**
   * Distance traveled give the velocity, time, and acceleration
   * Dx = V0x * t + 0.5 * Ax * t^2
   */
  public static distance(initialVelocity:number, time:number, acceleration:number) {
    return initialVelocity * time + 0.5 * acceleration * Math.pow(time,2);
  }
}
