#define PARTICLE_LIFE_SPEED 2.0

#define HUGE 9E16
#define PI 3.14159265
#define V vec3(0.,1.,-1.)
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,m) (floor((i)/(m))*(m))

// ------

#extension GL_EXT_draw_buffers : require
precision highp float;

varying float vLen;
varying float vLife;
varying vec2 vChar;
varying vec2 vUv;

uniform vec4 fgColor;
uniform vec4 bgColor;

uniform sampler2D textureWord;

// ------

void main() {
  vec2 charUv = gl_PointCoord.xy / 16.0 + vChar;
  float shape = texture2D( textureWord, charUv ).x;
  if ( shape < 0.5 ) { discard; }
  gl_FragData[ 0 ] = vec4( mix(
    bgColor.xyz,
    fgColor.xyz,
    exp( -0.02 * vLen )
  ), 1.0 );
  gl_FragData[ 1 ] = vec4( vLen, 0.0, 0.0, 1.0 );
}