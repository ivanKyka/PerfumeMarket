import React from 'react';
import styled, {keyframes} from 'styled-components';
import Image0 from '../resources/image/Content/0.jpg';
import Image1 from '../resources/image/Content/1.jpg';
import Image2 from '../resources/image/Content/2.jpg';
import Image3 from '../resources/image/Content/3.jpg';
import Image4 from '../resources/image/Content/4.jpg';
import Image5 from '../resources/image/Content/5.jpg';
import Image6 from '../resources/image/Content/6.jpg';
import Image7 from '../resources/image/Content/7.jpg';

export default class ContentContainer extends React.Component {

    render() {
        let images = [
            {
            name: 'Lorem ipsum',
            gender: 'M',
            price: '199',
            size: ['100ml', '200ml'],
            grade: 3,
            responces: 0,
            image: Image1
        },{
            name: 'Lorem',
            gender: 'W',
            price: '255',
            size: ['100ml'],
            grade: 4,
            responces: 12,
            image: Image2
        },{
            name: 'Lorem',
            gender: 'M',
            price: '180',
            size: ['100ml', '200ml'],
            grade: 5,
            responces: 5,
            image: Image3
        },{
            name: 'Lorem ipsum',
            gender: 'W',
            price: '550',
            size: ['50ml', '100ml', '200ml', '300ml'],
            grade: 1,
            responces: 112,
            image: Image4
        },{
            name: 'Lorem ipsum',
            gender: 'M',
            price: '1200',
            size: ['100ml', '200ml'],
            grade: 2,
            responces: 8,
            image: Image5
        },{
            name: 'Lorem ipsum',
            gender: 'W',
            price: '1100',
            size: ['100ml', '200ml'],
            grade: 3,
            responces: 0,
            image: Image6
        },{
            name: 'Lorem',
            gender: 'U',
            price: '99',
            size: ['100ml', '200ml'],
            grade: 4,
            responces: 0,
            image: Image7
        },{
            name: 'Lorem ipsum dolor',
            gender: 'U',
            price: '10999',
            size: ['100ml', '200ml'],
            grade: 5,
            responces: 0,
            image: Image0
        }];

        return(
            <Container>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image4} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image6} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda commodi deleniti.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image7} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque facilis fugit minus quasi ratione repellendus? Harum ipsum magni optio velit.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image4} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image6} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda commodi deleniti.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image7} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque facilis fugit minus quasi ratione repellendus? Harum ipsum magni optio velit.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image4} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image6} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda commodi deleniti.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image7} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque facilis fugit minus quasi ratione repellendus? Harum ipsum magni optio velit.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image4} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image6} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda commodi deleniti.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image7} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque facilis fugit minus quasi ratione repellendus? Harum ipsum magni optio velit.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image4} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image6} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda commodi deleniti.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image7} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>
                <Block>
                    <Image src={Image5} alt=""/>
                    <BlockInfo>
                        <Link href={''}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque facilis fugit minus quasi ratione repellendus? Harum ipsum magni optio velit.</Link>
                    </BlockInfo>
                    <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
                </Block>

            </Container>
        )
    }

}

const Container = styled.div`
  width: calc(100% - 200px);
  margin: 25px 100px 15px 100px;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  grid-auto-rows: 400px;
`;

const BlockHover = keyframes`
  0% { 
    height: 400px; 
  }
  100%  { 
    height: 550px; 
  }
`;

const ShowText = keyframes`
  0% { 
    height: 0;
  }
  100%  { 
    height: 150px; 
  }
`;

const Block = styled.div`
  height: 400px;
  z-index: 5;
  border: 1px solid #bbb;
  background: #fff;
  overflow: hidden;

  & > div:last-child {
      display: none;
    }
    
  &:hover {
    border: 1px solid #666;
    z-index: 6;
    box-shadow: 4px 4px  5px rgba(75,75,75, 0.5);
    animation: ${BlockHover} .2s ease-out forwards;
    & > div:last-child {
    display: block;
    animation: ${ShowText} .4s ease-in forwards;
    }
  }
`;

const Image = styled.img`
  width: 80%;
  margin: 10% 10% 0 10%;
  height: 250px;
`;

const BlockInfo = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const Link = styled.a`
    font-size: 14px;
    text-decoration: none;
    margin: 5px 20px;
    &:hover{
    text-decoration: underline;
    }
`;

const HiddenInfo = styled.div`
  margin: 5px 20px;
`;