#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 coords;

uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	
     if ( coords.x <= -0.2)
		gl_FragColor = vec4(1.0, 0.6863, 0.2510, 1.0);
	else
	{
        gl_FragColor = color;
	}
}