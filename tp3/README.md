# CGRA 2020/2021

## Group T03G05

## TP 3 Notes

### Experiments

#### Ambient 

- We observed that we can not distinguish the pyramid from the cone using only Ambient Light.

- We saw that the plane was viewed in diferent "light" as we increased the value of the AmbLight variable and when its value was 0 we couldn't see the material.

#### Difuse

- We can see only the faces of the solids (Pyramid and Cone) that are "iluminated" by the light.

- After changing the z parameter of Light 0 we could see the plane more clearly.

- With the Light in the [2, 2, 1] position, changing the observator position, the Plane was lighted the same way, proving that unlike the specular light, the difuse light does not depend on that parameter.

#### Specular

- We observed all the changes reported on the worksheet and we also "discovered" that as the shininess increases the part of the object that we see iluminated by light decreases. As we increase the Plane Complexity we see a more smooth surface.

#### Combining the lighting components

- We managed to see all the changes reported on the worksheet. The complexity of the object makes changes on its "reflection".

#### Atenuation

- We observed that different combinations of attenuation values cause different outcomes in the "ilumination" depending on the distance of the light source. With the Linear and the Quadratic Attenuations, after we reach the z of the light in which the whole plane is "iluminated" if we continue to increase it we observe a decrease of the light on that object.

### Exercices

- In exercise 3 we had some issues with defining the normals (mainly in the UnitCube Object) that after reviewing we were to able to fix.

- In the other exercises we had no major difficulties.

#### Note - hextoRgbA
 - In order to pick the colors in a more accurate way we used the hextoRgbA function defined on MyScene. 
