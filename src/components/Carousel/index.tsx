import { useMediaQuery, useTheme } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import Item from "../Item";
import { Context, ContextType } from "../Provider";
import Slider from "../Slider";
import Track from "../Track";

export interface CarouselPropTypes {
  children: React.ReactNode[];
  gap: number;
  full: boolean;
}

export const Carousel: React.FC<CarouselPropTypes> = ({ children, gap, full }) => {
  const context = useContext(Context);

  const {
    setItemWidth,
    sliderWidth,
    setMultiplier,
    setConstraint,
    itemWidth,

    activeItem,
    setPositions,
  } = context as ContextType;

  const { breakpoints } = useTheme();

  useEffect(() => {
    const newPositions = children?.map(
      (_, index) => -Math.abs((itemWidth + gap) * index)
    );
    setPositions(newPositions);
  }, [children, gap, itemWidth, setPositions]);

  const [isBetweenBaseAndMd] = useMediaQuery(
    `(min-width: ${breakpoints?.base}) and (max-width: ${breakpoints?.md})`
  );

  const [isBetweenMdAndXl] = useMediaQuery(
    `(min-width: ${breakpoints?.md}) and (max-width: ${breakpoints?.xl})`
  );

  const [isGreaterThanXL] = useMediaQuery(`(min-width: ${breakpoints?.xl})`);

  useEffect(() => {
    if (full) {
      setItemWidth(sliderWidth - gap);
      setMultiplier(0.8);
      setConstraint(1);
    }else{
      if (isBetweenBaseAndMd) {
        setItemWidth(sliderWidth - gap);
        setMultiplier(0.65);
        setConstraint(1);
      }
      if (isBetweenMdAndXl) {
        setItemWidth(sliderWidth / 2 - gap);
        setMultiplier(0.5);
        setConstraint(2);
      }
      if (isGreaterThanXL) {
        setItemWidth(sliderWidth / 3 - gap);
        setMultiplier(0.35);
        setConstraint(3);
      }
    }
    
  }, [
    isBetweenBaseAndMd,
    isBetweenMdAndXl,
    isGreaterThanXL,
    sliderWidth,
    gap,
    setItemWidth,
    setMultiplier,
    setConstraint,
  ]);

  return (
    <Slider gap={gap}>
      <Track>
        {children.map((child, index) => (
          <Item gap={gap} key={index} index={index}>
            {child}
          </Item>
        ))}
      </Track>
    </Slider>
  );
};
