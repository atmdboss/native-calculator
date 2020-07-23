import * as React from "react";
// import "react-native";
import * as renderer from "react-test-renderer";
import {ButtonGrid} from '../components/ButtonGrid';
import App from '../../App';



describe('App renders correctly',()=>{
    it('renders app element',()=>{
        const app = renderer.create(<App/>).toJSON();
        expect(app).toMatchSnapshot();
        expect(app.children.length).toBe(2); 
    });    
});

describe('ButtonGrid renders correctly',()=>{
    it('renders 6 views with all buttons',()=>{
        const button = renderer.create(<ButtonGrid/>).toJSON();
        const btnChildren = button.children;
        const nested = button.children.reduce((acc,curr)=>{
            const childs = curr.children;
            return [...acc,...childs];
        },[])

        expect(btnChildren.length).toBe(6); 
        expect(nested.length).toBe(23); 
    });    
});


