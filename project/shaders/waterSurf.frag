#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler1;
uniform float distortion;
uniform float timeFactor;

void main() {
	
    vec4 distRG = texture2D(uSampler1, vTextureCoord);

    vec2 offset = distRG.rg + vec2(-distortion * timeFactor/50.0, distortion * timeFactor/50.0);

    if (offset.x > 1.0) offset.x -= 1.0;
    if (offset.y > 1.0) offset.y -= 1.0;

    vec4 color = texture2D(uSampler, vTextureCoord + offset);

    gl_FragColor = color;
}