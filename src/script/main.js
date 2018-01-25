import xorshift from './xorshift';
xorshift( 13487134006 );
import GLCat from './glcat';
import Path from './glcat-path';
import step from './step';
import Tweak from './tweak';
import wordSprite from './word-sprite';
import Automaton from './automaton.min';
import octahedron from './octahedron';

const glslify = require( 'glslify' );

// ------

const clamp = ( _value, _min, _max ) => Math.min( Math.max( _value, _min ), _max );
const saturate = ( _value ) => clamp( _value, 0.0, 1.0 );

// ------

let automaton = new Automaton( {
  gui: divAutomaton,
  data: `
  {"rev":20170418,"length":1,"resolution":1000,"params":{"fillColor":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]}],"jpegLofi":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.45,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.7,"value":0.06,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.798311444652908,"value":0.01,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":7.105427357601002e-15,"mode":2,"params":{},"mods":[false,false,false,false]}],"pixelsortThreshold":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]}],"jpegHigh":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.45,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.699812382739212,"value":0.3822774578069317,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]}],"どうするよ":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]}],"cameraZ":[{"time":0,"value":20,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.17073170731707318,"value":20,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.30037523452157605,"value":10,"mode":4,"params":{"rate":11000.267,"damp":1},"mods":[{"velocity":0},false,false,false]},{"time":0.6,"value":9.999999999999998,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.798686679174484,"value":19.642857142857146,"mode":4,"params":{"rate":9.8,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":20,"mode":4,"params":{"rate":2000,"damp":1},"mods":[false,false,false,false]}],"altColor":[{"time":0,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]}],"cameraRot":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.4,"value":0.2,"mode":5,"params":{"gravity":1.64,"bounce":0.3},"mods":[false,false,false,false]},{"time":0.7,"value":0.9,"mode":5,"params":{"gravity":12.158,"bounce":0},"mods":[false,false,false,false]},{"time":1,"value":1,"mode":4,"params":{"rate":500,"damp":1},"mods":[false,false,false,false]}],"loadingScaleX":[{"time":0,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.375,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.5013477088948787,"value":3.3333333333333393,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.54177897574124,"value":2.142857142857146,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1,"value":1,"mode":0,"params":{},"mods":[false,false,false,false]}],"loadingScaleY":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.375,"value":1,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.4690026954177898,"value":-0.5952380952380913,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.5390835579514824,"value":-2.499999999999991,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.5983827493261457,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]}],"blockSize":[{"time":0,"value":8,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.45,"value":8,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.699812382739212,"value":128,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":64,"mode":0,"params":{},"mods":[false,false,false,false]}],"focus":[{"time":0,"value":5,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.0375234521575985,"value":4.880952380952382,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.13133208255159476,"value":17.056624868529887,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.2,"value":17,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.4,"value":5,"mode":4,"params":{"rate":2000,"damp":1},"mods":[{"velocity":0},false,false,false]},{"time":1,"value":5,"mode":1,"params":{},"mods":[false,false,false,false]}],"charShuffle":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.3427767354596623,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.7,"value":0.4758417038690459,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.800187617260788,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]}]},"gui":{"snap":{"enable":false,"bpm":120,"offset":0}}}
`
} );
let auto = automaton.auto;

// ------

let width = 512;
let height = 512;
canvas.width = width;
canvas.height = height;

let gl = canvas.getContext( 'webgl' );
let glCat = new GLCat( gl );
let path = new Path( glCat );

// ------

let tweak = new Tweak( divTweak );

// ------

let totalFrame = 0;
let frame = 0;
let frames = 200;
let time = 0.0;
let init = true;
let secs = 1.0;
let deltaTime = 0.0;

let timeUpdate = () => {
  let reset = false;

  totalFrame ++;
  frame ++;
  if ( frames <= frame ) {
    frame = 0;
    reset = true;
  }
  
  let prevTime = time;
  time = secs * frame / frames;
  deltaTime = ( time + ( reset ? secs : 0.0 ) ) - prevTime;

  init = false;
};

// ------

let particlePixels = 4;
let particlesSqrt = 40;
let particles = particlesSqrt * particlesSqrt;
let vertsPerParticle = 1;

let vboQuad = glCat.createVertexbuffer( [ -1, -1, 1, -1, -1, 1, 1, 1 ] );

let oct = octahedron( 6 );
let vboOctPos = glCat.createVertexbuffer( oct.pos );
let vboOctNor = glCat.createVertexbuffer( oct.nor );

let vboParticle = glCat.createVertexbuffer( ( () => {
  let ret = [];
  for ( let i = 0; i < particlesSqrt * particlesSqrt * vertsPerParticle; i ++ ) {
    let ix = Math.floor( i / vertsPerParticle ) % particlesSqrt;
    let iy = Math.floor( i / particlesSqrt / vertsPerParticle );
    let iz = i % vertsPerParticle;
    
    ret.push( ix * particlePixels );
    ret.push( iy );
    ret.push( iz );
  }
  return ret;
} )() );

// ------

let textureRandomSize = 256;

let textureRandomUpdate = ( _tex ) => {
  glCat.setTextureFromArray( _tex, textureRandomSize, textureRandomSize, ( () => {
    let len = textureRandomSize * textureRandomSize * 4;
    let ret = new Uint8Array( len );
    for ( let i = 0; i < len; i ++ ) {
      ret[ i ] = Math.floor( xorshift() * 256.0 );
    }
    return ret;
  } )() );
};


let textureWord = glCat.createTexture();
glCat.setTexture( textureWord, wordSprite );

let textureRandomStatic = glCat.createTexture();
glCat.textureWrap( textureRandomStatic, gl.REPEAT );
textureRandomUpdate( textureRandomStatic );

let textureRandom = glCat.createTexture();
glCat.textureWrap( textureRandom, gl.REPEAT );

// ------

let renderA = document.createElement( 'a' );

let saveFrame = () => {
  renderA.href = canvas.toDataURL( 'image/jpeg' );
  renderA.download = ( '0000' + totalFrame ).slice( -5 ) + '.jpg';
  renderA.click();
};

// ------

let mouseX = 0.0;
let mouseY = 0.0;

// ------

let cameraPos = [ 0.0, 2.0, 5.0 ];
let cameraRot = 0.0;
let cameraFov = 90.0;

// ------

let bgColor = [ 0.8, 0.02, 0.06, 1.0 ];
let fgColor = [ 0.0, 0.0, 0.0, 1.0 ];

// ------

path.setGlobalFunc( () => {
  glCat.uniform1i( 'init', init );
  glCat.uniform1f( 'time', time );
  glCat.uniform1f( 'deltaTime', deltaTime );
  glCat.uniform3fv( 'cameraPos', cameraPos );
  glCat.uniform1f( 'cameraRot', cameraRot );
  glCat.uniform1f( 'cameraFov', cameraFov );
  glCat.uniform1f( 'particlesSqrt', particlesSqrt );
  glCat.uniform1f( 'particlePixels', particlePixels );
  glCat.uniform1f( 'frame', frame % frames );
  glCat.uniform1f( 'frames', frames );
  glCat.uniform1i( 'blockSize', 8 );
  glCat.uniform1f( 'vertsPerParticle', vertsPerParticle );
} );

path.add( {
  particlesComputeReturn: {
    width: particlesSqrt * particlePixels,
    height: particlesSqrt,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/return.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniformTexture( 'texture', path.fb( "particlesCompute" ).texture, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },

  particlesCompute: {
    width: particlesSqrt * particlePixels,
    height: particlesSqrt,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/particles-compute.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniform1f( 'charShuffle', auto( 'charShuffle' ) );
      glCat.uniformTexture( 'textureReturn', path.fb( "particlesComputeReturn" ).texture, 0 );
      glCat.uniformTexture( 'textureRandom', textureRandom, 1 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
  
  particlesRender: {
    width: width,
    height: height,
    vert: glslify( './shader/particles-render.vert' ),
    frag: glslify( './shader/particles-render.frag' ),
    drawbuffers: 2,
    blend: [ gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'vuv', vboParticle, 3 );
      glCat.uniform2fv( 'resolutionPcompute', [ particlesSqrt * particlePixels, particlesSqrt ] );
      glCat.uniformTexture( 'texturePcompute', path.fb( "particlesCompute" ).texture, 0 );
      glCat.uniformTexture( 'textureWord', textureWord, 1 );
      
      glCat.uniform4fv( 'fgColor', fgColor );
      gl.drawArrays( gl.POINT, 0, particles * vertsPerParticle );
    }
  },
  
  dof: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/dof.frag' ),
    blend: [ gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: ( p ) => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniform1f( 'focus', auto( 'focus' ) );
      glCat.uniformTexture( 'sampler0', path.fb( "particlesRender" ).textures[ 0 ], 0 );
      glCat.uniformTexture( 'samplerDepth', path.fb( "particlesRender" ).textures[ 1 ], 1 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
  
  ball: { // 使わないよ
    width: width,
    height: height,
    vert: glslify( './shader/object.vert' ),
    frag: glslify( './shader/render-wireframe.frag' ),
    blend: [ gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA ],
    func: () => {
      glCat.attribute( 'pos', vboOctPos, 3 );
      
      glCat.uniform4fv( 'fgColor', fgColor );
      gl.drawArrays( gl.TRIANGLES, 0, oct.pos.length / 3 );
    }
  },
  
  "Gowrock - bloom": {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/bloom.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    tempFb: glCat.createFloatFramebuffer( width, height ),
    func: ( p ) => {
      for ( let i = 0; i < 3; i ++ ) {
        let gaussVar = [ 5.0, 15.0, 30.0 ][ i ];
        gl.bindFramebuffer( gl.FRAMEBUFFER, p.tempFb.framebuffer );
        glCat.clear( ...p.clear );

        glCat.attribute( 'p', vboQuad, 2 );
        glCat.uniform1i( 'isVert', false );
        glCat.uniform1f( 'gaussVar', gaussVar );
        glCat.uniformTexture( 'sampler0', path.fb( "dof" ).texture, 0 );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
        
        gl.bindFramebuffer( gl.FRAMEBUFFER, p.framebuffer.framebuffer );

        glCat.attribute( 'p', vboQuad, 2 );
        glCat.uniform1i( 'isVert', true );
        glCat.uniform1f( 'gaussVar', gaussVar );
        glCat.uniformTexture( 'sampler0', p.tempFb.texture, 0 );
        glCat.uniformTexture( 'samplerDry', path.fb( "dof" ).texture, 1 );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
      }
    }
  },
  
  おたくはすぐポストエフェクトを挿す: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/post.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniformTexture( 'sampler0', path.fb( "dof" ).texture, 0 );
      glCat.uniformTexture( 'samplerBloom', path.fb( "Gowrock - bloom" ).texture, 1 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
  
  jpegCosine: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/jpeg-cosine.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    tempFb: glCat.createFloatFramebuffer( width, height ),
    func: ( p ) => {
      gl.bindFramebuffer( gl.FRAMEBUFFER, p.tempFb.framebuffer );
      glCat.clear( ...p.clear );

      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniform1i( 'isVert', false );
      glCat.uniform1i( 'blockSize', auto( "blockSize" ) );
      glCat.uniformTexture( 'sampler0', path.prev.texture, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

      gl.bindFramebuffer( gl.FRAMEBUFFER, p.framebuffer.framebuffer );

      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniform1i( 'isVert', true );
      glCat.uniform1i( 'blockSize', auto( "blockSize" ) );
      glCat.uniformTexture( 'sampler0', p.tempFb.texture, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
    
  jpegRender: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/jpeg-render.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    tempFb: glCat.createFloatFramebuffer( width, height ),
    func: ( p ) => {
      gl.bindFramebuffer( gl.FRAMEBUFFER, p.tempFb.framebuffer );
      glCat.clear( ...p.clear );

      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniform1i( 'isVert', false );
      glCat.uniform1i( 'blockSize', auto( "blockSize" ) );
      glCat.uniform1f( 'highFreqMultiplier', auto( "jpegHigh" ) );
      // glCat.uniform1f( 'dataThreshold', 0.04 );
      glCat.uniform1f( 'dataLofi', auto( "jpegLofi" ) );
      glCat.uniformTexture( 'sampler0', path.prev.texture, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
      
      gl.bindFramebuffer( gl.FRAMEBUFFER, null );
      
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniform1i( 'isVert', true );
      glCat.uniform1i( 'blockSize', auto( "blockSize" ) );
      glCat.uniform1f( 'highFreqMultiplier', auto( "jpegHigh" ) );
      // glCat.uniform1f( 'dataThreshold', 0.04 );
      glCat.uniform1f( 'dataLofi', auto( "jpegLofi" ) );
      glCat.uniformTexture( 'sampler0', p.tempFb.texture, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
} );

// ------

let updateUI = () => {
  let now = new Date();
  let deadline = new Date( 2017, 11, 1, 0, 0 );

  divCountdown.innerText = "Deadline: " + Math.floor( ( deadline - now ) / 1000 );

  divFrame.innerText = "Frames: " + totalFrame;
};

// ------

let update = () => {
  if ( frame % frames === 0 ) { xorshift( 79017846734887343443 ); }

  if ( !tweak.checkbox( 'play', { value: true } ) ) {
    setTimeout( update, 10 );
    return;
  }
  
  textureRandomUpdate( textureRandom );
  
  automaton.update( time );

  path.render( "particlesComputeReturn" );
  path.render( "particlesCompute" );
  path.render( "particlesRender" );
  path.render( "dof" );
  path.render( "Gowrock - bloom" );
  path.render( "おたくはすぐポストエフェクトを挿す" );
  path.render( "jpegCosine" );
  path.render( "jpegRender", null );

  cameraPos = [
    auto( "cameraZ" ) * Math.sin( 2.0 * Math.PI * auto( "cameraRot" ) ),
    0.0,
    auto( "cameraZ" ) * Math.cos( 2.0 * Math.PI * auto( "cameraRot" ) )
  ];
  cameraRot = 4.0;

  bgColor = [ 0.0, 0.0, 0.0, 1.0 ];
  fgColor = [ 1.0, 1.0, 1.0, 1.0 ];

  updateUI();

  timeUpdate();

  if ( tweak.checkbox( 'save', { value: false } ) ) {
    saveFrame();
  }
  
  requestAnimationFrame( update );
};

// ------

step( {
  0: ( done ) => {
    update();
  }
} );

window.addEventListener( 'keydown', ( _e ) => {
  if ( _e.which === 27 ) {
    tweak.checkbox( 'play', { set: false } );
  }
} );

window.addEventListener( 'mousemove', event => {
  mouseX = event.clientX;
  mouseY = event.clientY;
} );