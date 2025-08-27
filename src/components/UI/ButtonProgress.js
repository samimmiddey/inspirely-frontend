const ButtonProgress = ({ height, width }) => {
   return (
      <span
         class="btn-loader"
         style={{
            height: height ? height : 30,
            width: width ? width : 30
         }}
      />
   );
};

export default ButtonProgress;