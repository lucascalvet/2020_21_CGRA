#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 coords;

uniform sampler2D uSampler;
uniform float bodyHeadRatio;
uniform vec4 colorBody;



void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	float separator;

	separator = (bodyHeadRatio - 0.5) * 2.0;

    if (coords.x <= separator)
		gl_FragColor = colorBody;
	else
        gl_FragColor = color;
}