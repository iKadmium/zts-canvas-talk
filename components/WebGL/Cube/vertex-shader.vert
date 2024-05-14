#version 300 es

in vec4 a_position;
in vec4 a_vertexColor;

uniform mat4 a_modelViewMatrix;
uniform mat4 a_projectionMatrix;

out vec4 vColor;

void main() {
	// gl_Position is a special variable a vertex shader
	// is responsible for setting
	gl_Position = a_projectionMatrix * a_modelViewMatrix * a_position;
	vColor = a_vertexColor;
}