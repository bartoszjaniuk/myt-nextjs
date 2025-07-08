import React from "react";

export const Content = ({
	headerComponent,
	children,
}: {
	headerComponent: React.ReactNode;
	children: React.ReactNode;
}) => {
	return (
		<div className="flex flex-1 flex-col overflow-hidden">
			{headerComponent}

			<div className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
				{children}
			</div>
		</div>
	);
};
