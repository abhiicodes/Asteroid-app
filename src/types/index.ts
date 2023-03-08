export interface AboutData {
  name?: string;
  id?: string;
  nasa_jpl_url?: string;
  is_potentially_hazardous_asteroid?: boolean;
}

export type RootStackParamList = {
  About: {data: AboutData};
  Home: undefined;
};

export interface Asteroid { 
  near_earth_objects: AboutData[];
}
