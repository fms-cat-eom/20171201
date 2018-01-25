#define V vec2(0.,1.)
#define saturate(i) clamp(i,0.,1.)
#define PI 3.14159265
#define SAMPLES 10

// ------

precision highp float;

uniform vec2 resolution;
uniform sampler2D sampler0;
uniform sampler2D samplerDepth;
uniform float focus;

float gaussian( float _x, float _v ) {
  return 1.0 / sqrt( 2.0 * PI * _v ) * exp( - _x * _x / 2.0 / _v );
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;

  vec3 sum = V.xxx;
  for ( int iy = -SAMPLES; iy <= SAMPLES; iy ++ ) {
    for ( int ix = -SAMPLES; ix <= SAMPLES; ix ++ ) {
      vec2 delta = vec2( ix, iy );
      vec2 v = saturate( uv + delta / resolution );
      vec3 tex = texture2D( sampler0, v ).xyz;
      float len = texture2D( samplerDepth, v ).x;
      if ( len != 0.0 ) {
        float gauss = 0.3 + 0.1 * pow( abs( focus - len ), 2.0 );
        float mul = gaussian( abs( delta.x ), gauss ) * gaussian( abs( delta.y ), gauss );
        sum += tex * mul;
      }
    }
  }

  gl_FragColor = vec4( 0.8 * ( 1.0 - sum ), 1.0 );
}
