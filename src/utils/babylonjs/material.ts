import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Scene } from '@babylonjs/core/scene';

interface CacheMaterial {
  projectColours: { [key: string]: StandardMaterial };
  charge?: StandardMaterial;
  nonCharge?: StandardMaterial;
}

const materialCache: CacheMaterial = {
  projectColours: {},
};

const generateProjectMaterials = (projectColours: { [key: number]: string }, scene: Scene) => {
  // Default is project ID = -1
  materialCache.projectColours[-1] = new StandardMaterial(`mat_proj_`, scene);
  Object.keys(projectColours).forEach((key) => {
    const mat = new StandardMaterial(`mat_proj_${key}`, scene);
    mat.diffuseColor = Color3.FromHexString(projectColours[key]);
    materialCache.projectColours[key] = mat;
  });

  // Apply uniform rendering
  const specularPower = 10;
  const specularColor = new Color3(0.15, 0.15, 0.15);
  Object.keys(materialCache.projectColours).forEach((key) => {
    materialCache.projectColours[key].specularColor = specularColor;
    materialCache.projectColours[key].specularPower = specularPower;
  });
};

const generateDefaultMaterials = (scene: Scene) => {
  const nc = new StandardMaterial('mat_non_charge', scene);
  nc.emissiveColor = new Color3(1, 0, 0);
  nc.diffuseColor = new Color3(1, 0, 0);
  nc.specularColor = Color3.Black();
  nc.alpha = 0.5;
  materialCache.nonCharge = nc;

  const c = new StandardMaterial('mat_charge', scene);
  c.emissiveColor = new Color3(0, 1, 0);
  c.diffuseColor = new Color3(0, 1, 0);
  c.specularColor = Color3.Black();
  c.alpha = 0.5;
  materialCache.charge = c;
};

const getProjectMaterial = (projectId: number) => materialCache.projectColours[projectId] || getProjectMaterial(-1);

export { generateProjectMaterials, generateDefaultMaterials, getProjectMaterial, materialCache };
