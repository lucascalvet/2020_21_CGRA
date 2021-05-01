#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler1;
uniform float distortion;
uniform float timeFactor;

void main() {
    vec2 offset = texture2D(uSampler1, vTextureCoord + 0.4 * sin(timeFactor/100.0)).rg - vec2(0.5, 0.5) ;

    vec2 newTexCoords = vTextureCoord + offset * 0.6;

    vec4 color = texture2D(uSampler, newTexCoords);

    gl_FragColor = color;
}