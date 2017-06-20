import React from 'react';
import { shallow } from 'enzyme';

import FlyLight from './FlyLight';

describe('FlyLight', () => {
   it('should be render without crash', () => {
       expect(() => {
           shallow(<FlyLight/>);
       }).not.toThrow();
   });
   
   it('should be initialize count for lights', () =>{
       const count = 10;
       const flyLight = shallow(<FlyLight count={count}/>);
       
       const realCount = flyLight.find('[data-test="light"]').length;
       expect(realCount).toEqual(count);
   });
});