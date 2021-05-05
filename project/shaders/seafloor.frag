#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 coords;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

uniform float nestX;
uniform float nestZ;
uniform float nestRadius;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
    color *= (texture2D(uSampler2, vTextureCoord) + 1.5) / 2.5;

    vec4 temp_color;
    if (coords.x >= nestX && coords.z >= nestZ && coords.x < nestX + nestRadius && coords.z < nestZ + nestRadius) {
        temp_color =  texture2D(uSampler3, vec2((coords.x - nestX)/nestRadius, (coords.z - nestZ)/nestRadius));
        if (temp_color.a != 0.0) discard;
    }

    gl_FragColor = color;
}