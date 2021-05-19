#version 300 es
precision highp float;

in vec4 vFinalColor;
in vec2 vTextureCoord;
in vec3 coords;

out vec4 fragColor;

uniform sampler2D uSampler;

uniform bool uUseTexture;

uniform float bodyHeadRatio;
uniform vec4 colorBody;

void main() {
	// Branching should be reduced to a minimal. 
	// When based on a non-changing uniform, it is usually optimized.

	float separator;

	separator = (bodyHeadRatio - 0.5) * 2.0;

    if (coords.x <= separator){
		fragColor = colorBody * vFinalColor;
	}
	else{
		vec4 textureColor = texture(uSampler, vTextureCoord);
		fragColor = textureColor * vFinalColor;
	}
	
	/*
	if (uUseTexture)
	{
		vec4 textureColor = texture(uSampler, vTextureCoord);
		fragColor = textureColor * vFinalColor;
	}
	else
		fragColor = vFinalColor;
		*/

}