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
    color *= (texture2D(uSampler2, vTextureCoord) + 1.5) / 2.5;

    vec4 temp_color;
    if (coords.x >= nestX && coords.z >= nestZ && coords.x < nestX + nestRadius && coords.z < nestZ + nestRadius) {
        temp_color =  texture2D(uSampler3, vec2((coords.x - nestX)/nestRadius, (coords.z - nestZ)/nestRadius));
        if (temp_color.a != 0.0) discard;
    }

    if(isNight == 1)
        gl_FragColor = color * uLight[1].diffuse;
    else
        gl_FragColor = color * uLight[0].diffuse;
}