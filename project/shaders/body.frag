#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 coords;

uniform sampler2D uSampler;
uniform float bodyHeadRatio;
uniform vec4 colorBody;
uniform int isNight;

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

#define NUMBER_OF_LIGHTS 2
uniform lightProperties uLight[NUMBER_OF_LIGHTS];

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	float separator;

	separator = (bodyHeadRatio - 0.5) * 2.0;

    if (coords.x <= separator){
		if(isNight == 1)
			gl_FragColor = colorBody * uLight[1].diffuse;
		else
			gl_FragColor = colorBody * uLight[0].diffuse;
	}	
	else{
		if(isNight == 1)
			gl_FragColor = color * uLight[1].diffuse;
		else
			gl_FragColor = color * uLight[0].diffuse;
	}
}