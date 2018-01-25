#define HUGE 9E16
#define PI 3.14159265
#define V vec3(0.,1.,-1.)
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,m) (floor((i)/(m))*(m))

// ------

attribute vec3 pos;

varying float vLen;

uniform float time;
uniform vec2 resolution;
uniform vec3 cameraPos;
uniform float cameraRot;
uniform float cameraFov;

// ------

mat2 rotate2D( float _t ) {
  return mat2( cos( _t ), sin( _t ), -sin( _t ), cos( _t ) );
}

mat4 lookAt( vec3 _pos, vec3 _tar, vec3 _air, float _rot ) {
  vec3 dir = normalize( _tar - _pos );
  vec3 sid = normalize( cross( dir, _air ) );
  vec3 top = normalize( cross( sid, dir ) );
  sid = cos( _rot ) * sid + sin( _rot ) * top;
  top = normalize( cross( sid, dir ) );
  return mat4(
    sid.x, top.x, dir.x, 0.0,
    sid.y, top.y, dir.y, 0.0,
    sid.z, top.z, dir.z, 0.0,
    - sid.x * _pos.x - sid.y * _pos.y - sid.z * _pos.z,
    - top.x * _pos.x - top.y * _pos.y - top.z * _pos.z,
    - dir.x * _pos.x - dir.y * _pos.y - dir.z * _pos.z,
    1.0
  );
}

mat4 perspective( float _fov, float _aspect, float _near, float _far ) {
  float p = 1.0 / tan( _fov * PI / 180.0 / 2.0 );
  float d = _far / ( _far - _near );
  return mat4(
    p / _aspect, 0.0, 0.0, 0.0,
    0.0, p, 0.0, 0.0,
    0.0, 0.0, d, 1.0,
    0.0, 0.0, -_near * d, 0.0
  );
}

// ------

void main() {
  mat4 matP = perspective( cameraFov, resolution.x / resolution.y, 0.01, 100.0 );
  mat4 matV = lookAt( cameraPos, vec3( 0.0, 0.0, 0.0 ), V.xyx, cameraRot );

  vec3 p = pos;
  p *= 1.0;
  vLen = length( p.xyz - cameraPos );

  vec4 outPos = matP * matV * vec4( p.xyz, 1.0 );
  gl_Position = outPos;
}