#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler; //pier day
uniform sampler2D uSampler1; //distortion map
uniform sampler2D uSampler2; //pier night

uniform float timeFactor;
uniform int isNight;

void main() {
    vec2 offset = texture2D(uSampler1, vTextureCoord + timeFactor/100.0).rg - vec2(0.5, 0.5);

    vec2 newTexCoords = vTextureCoord + offset * 0.6;

    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);

    if(isNight == 0)
        color = texture2D(uSampler, newTexCoords) - vec4(0.45, 0.45, 0.4, 0.0); //to darken
    else
        color = texture2D(uSampler2, newTexCoords);

    gl_FragColor = color;
}