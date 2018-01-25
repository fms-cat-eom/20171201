#define PARTICLE_LIFE_SPEED 2.0

#define HUGE 9E16
#define PI 3.14159265
#define V vec3(0.,1.,-1.)
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,m) (floor((i)/(m))*(m))

// ------

precision highp float;

varying float vLen;

uniform vec4 fgColor;
uniform vec4 bgColor;

// ------

void main() {
  gl_FragColor = vec4( mix(
    bgColor.xyz,
    fgColor.xyz,
    exp( -0.02 * vLen )
  ), 1.0 );
}