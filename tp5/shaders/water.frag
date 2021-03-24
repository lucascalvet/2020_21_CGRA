#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler3;
uniform sampler2D uSampler4;

void main() {

    vec4 color = texture2D(uSampler3, vTextureCoord) - texture2D(uSampler4, vTextureCoord)*0.15;

    if(color.r < 0.0) color.r = 0.0;
    if(color.g < 0.0) color.g = 0.0;
    if(color.b < 0.0) color.b = 0.0;
    color.a = 1.0;

	gl_FragColor = color;
}