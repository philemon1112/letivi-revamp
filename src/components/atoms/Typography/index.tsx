import React from "react";
import PropTypes from "prop-types";

type TypographyProps = {
	children: React.ReactNode;
	className?: string;
	weight?: number;
};

export default function Typography({
	children,
	weight = 400,
	className = "",
	...props
}: TypographyProps) {
	return (
		<p
			style={{
				fontWeight: weight,
			}}
			className={`${className} `}
			{...props}
		>
			{children}
		</p>
	);
}

// Typography.defaultProps = {
// 	weight: 400,
// 	className: "",
// };

Typography.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	weight: PropTypes.number,
};
